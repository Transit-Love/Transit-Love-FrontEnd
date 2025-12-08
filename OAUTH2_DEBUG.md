# OAuth2 `authorization_request_not_found` 에러 해결 가이드

## 문제 상황

프론트엔드에서 Google OAuth2 로그인 시도 시 `authorization_request_not_found` 에러 발생

## 에러 원인 분석

이 에러는 **백엔드의 Spring Security OAuth2 설정 문제**로 인해 발생합니다:

1. OAuth 인증 요청 시 생성된 세션/state가 리다이렉트 시점에 유실됨
2. 쿠키가 제대로 전달되지 않음 (CORS/SameSite 문제)
3. 리다이렉트 URI 불일치

## 백엔드 설정 확인 사항

### 1. application.yml OAuth2 설정

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}
            scope:
              - email
              - profile
            # ⚠️ 이 redirect-uri는 Google이 호출하는 백엔드 엔드포인트입니다
            redirect-uri: "http://localhost:8080/login/oauth2/code/google"
        provider:
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/v2/auth
            token-uri: https://oauth2.googleapis.com/token
            user-info-uri: https://www.googleapis.com/oauth2/v3/userinfo
            user-name-attribute: sub
```

### 2. Google Cloud Console 설정

승인된 리디렉션 URI에 다음 추가:

- `http://localhost:8080/login/oauth2/code/google`
- `http://localhost:5173/oauth2/redirect` (선택사항)

### 3. CORS 설정 (WebMvcConfigurer)

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)  // ⚠️ 중요: 쿠키 전송 허용
                .maxAge(3600);
    }
}
```

### 4. SecurityConfig 설정

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                // ⚠️ STATELESS 대신 IF_REQUIRED 사용 (OAuth2 세션 유지)
                session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(authorization ->
                    authorization.baseUri("/oauth2/authorize")
                )
                .redirectionEndpoint(redirection ->
                    redirection.baseUri("/login/oauth2/code/*")
                )
                .userInfoEndpoint(userInfo ->
                    userInfo.userService(customOAuth2UserService)
                )
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler)
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);  // ⚠️ 중요

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 5. OAuth2 Success Handler

로그인 성공 시 프론트엔드로 리다이렉트:

```java
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                       HttpServletResponse response,
                                       Authentication authentication) throws IOException {

        // JWT 토큰 생성
        String token = jwtTokenProvider.generateToken(authentication);

        // 프론트엔드 리다이렉트 URL에 토큰 포함
        String redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/oauth2/redirect")
                .queryParam("token", token)
                .build()
                .toUriString();

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
```

### 6. OAuth2 Failure Handler

```java
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                       HttpServletResponse response,
                                       AuthenticationException exception) throws IOException {

        String redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/oauth2/redirect")
                .queryParam("error", exception.getMessage())
                .build()
                .toUriString();

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
```

## 디버깅 단계

### 1단계: 브라우저 콘솔 확인

프론트엔드에서 이미 상세한 로그를 출력하도록 설정되어 있습니다:

- Google 로그인 버튼 클릭 시 콘솔에 API URL과 리다이렉트 URL 확인
- OAuth 리다이렉트 페이지에서 받은 파라미터 확인

### 2단계: 백엔드 로그 확인

```yaml
logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.security.oauth2: DEBUG
```

### 3단계: 네트워크 탭 확인

1. `/oauth2/authorize/google` 요청 확인
2. Google 로그인 페이지로 리다이렉트 확인
3. `/login/oauth2/code/google` 콜백 확인
4. Set-Cookie 헤더 확인 (JSESSIONID 등)
5. 최종 `/oauth2/redirect?token=...` 리다이렉트 확인

### 4단계: 쿠키 확인

1. Chrome DevTools > Application > Cookies
2. `localhost:8080`과 `localhost:5173`의 쿠키 확인
3. `JSESSIONID` 쿠키가 존재하는지 확인
4. SameSite 속성 확인

## 프론트엔드 수정 사항 (이미 적용됨)

✅ `authService.ts`: redirect_uri 파라미터 제거 (백엔드가 자동 처리)
✅ `redirect/index.tsx`: 상세한 에러 메시지와 디버깅 로그 추가
✅ `client.ts`: `withCredentials: true` 설정 확인

## 일반적인 해결 방법

### 방법 1: Session 기반 OAuth2 (권장)

- `SessionCreationPolicy.IF_REQUIRED` 사용
- 쿠키 기반 세션 유지
- CORS에서 `allowCredentials(true)` 설정

### 방법 2: State 기반 (Stateless)

- Authorization Request Repository 커스터마이즈
- 쿠키 또는 Redis를 사용한 state 저장

### 방법 3: 직접 Google API 호출

- Spring Security OAuth2 대신 직접 구현
- 더 많은 컨트롤 가능하지만 복잡도 증가

## 다음 단계

1. **백엔드 팀에 전달**: 이 문서를 공유하고 위 설정 확인 요청
2. **로컬 테스트**: 백엔드 로그 레벨을 DEBUG로 변경하고 재시도
3. **네트워크 분석**: Chrome DevTools에서 전체 OAuth 흐름 추적
4. **대안**: 필요시 팝업 기반 OAuth 흐름으로 변경 가능

## 참고 자료

- [Spring Security OAuth2 Login](https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html)
- [CORS with Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
