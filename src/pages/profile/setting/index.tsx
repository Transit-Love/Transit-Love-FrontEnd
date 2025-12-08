import React, { useState, useEffect } from "react";
import * as S from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import PageHeader from "../../../components/PageHeader";
import profileService from "../../../api/profileService";
import type {
  CreateProfileRequest,
  Profile,
} from "../../../api/profileService";

const ProfileSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, isEdit } =
    (location.state as { profile?: Profile; isEdit?: boolean }) || {};

  const [nickname, setNickname] = useState("");
  const [mbti, setMbti] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<
    { id: number; name: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEdit && profile) {
      setNickname(profile.nickname);
      setMbti(profile.mbti || "");

      // 키워드 로드 (ID와 함께)
      setSelectedKeywords(profile.keywords);

      // 밸런스게임 답변 로드
      const answers: { [key: number]: number | null } = {};
      profile.balanceGameAnswers.forEach((answer, index) => {
        answers[index] = answer.selectedOption - 1; // 1-based를 0-based로 변환
      });
      setSelectedAnswers(answers);
    }
  }, [isEdit, profile]);

  const balanceGameQuestions = [
    {
      question: "데이트 장소는?",
      options: [
        { text: "카페에서 조용히", icon: "❤️" },
        { text: "놀이공원에서 신나게", icon: "⚡" },
      ],
    },
    {
      question: "주말에 뭐 할래?",
      options: [
        { text: "집에서 영화보기", icon: "📅" },
        { text: "밖에 나가서 산책", icon: "🎯" },
      ],
    },
    {
      question: "선물을 받는다면?",
      options: [
        { text: "실용적인 선물", icon: "⚔️" },
        { text: "감성적인 선물", icon: "🤔" },
      ],
    },
    {
      question: "여행 스타일은?",
      options: [
        { text: "계획적인 여행", icon: "💬" },
        { text: "즉흥적인 여행", icon: "🎁" },
      ],
    },
    {
      question: "연락 스타일은?",
      options: [
        { text: "자주 연락하기", icon: "🎮" },
        { text: "필요할 때만 연락", icon: "📖" },
      ],
    },
  ];

  const availableKeywords = [
    { id: 1, name: "운동" },
    { id: 2, name: "영화감상" },
    { id: 3, name: "음악듣기" },
    { id: 4, name: "독서" },
    { id: 5, name: "여행" },
    { id: 6, name: "요리" },
    { id: 7, name: "사진찍기" },
    { id: 8, name: "게임" },
    { id: 9, name: "맛집탐방" },
    { id: 10, name: "반려동물러버" },
  ];

  const handleKeywordToggle = (keyword: { id: number; name: string }) => {
    if (selectedKeywords.some((k) => k.id === keyword.id)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k.id !== keyword.id));
    } else if (selectedKeywords.length < 4) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setProfileImage(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));

    // 답변 선택 후 자동으로 다음 질문으로 이동
    if (questionIndex < balanceGameQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(questionIndex + 1);
      }, 300);
    }
  };

  const handleNextStep = async () => {
    // 유효성 검사
    if (!profileImage) {
      alert("프로필 이미지를 업로드해주세요.");
      return;
    }

    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (nickname.length > 50) {
      alert("닉네임은 50자 이하로 입력해주세요.");
      return;
    }

    if (!mbti.trim()) {
      alert("MBTI를 입력해주세요.");
      return;
    }

    if (selectedKeywords.length === 0) {
      alert("키워드를 최소 1개 이상 선택해주세요.");
      return;
    }

    // 모든 밸런스게임 답변이 있는지 확인
    const allAnswered = balanceGameQuestions.every(
      (_, idx) =>
        selectedAnswers[idx] !== null && selectedAnswers[idx] !== undefined
    );

    if (!allAnswered) {
      alert("모든 밸런스게임 질문에 답변해주세요.");
      return;
    }

    // MBTI 형식 검증 (선택사항)
    if (mbti && mbti.length !== 4) {
      alert("MBTI는 4자로 입력해주세요. (예: ENFP)");
      return;
    }

    // API 요청 데이터 생성
    const balanceGameAnswers = balanceGameQuestions.map((_, idx) => ({
      balanceGameId: idx + 1, // 실제 balanceGameId는 백엔드에서 제공되는 ID를 사용해야 함
      selectedOption: (selectedAnswers[idx] as number) + 1, // 0-based index를 1-based로 변환
    }));

    // 선택된 키워드의 실제 ID 사용
    const keywordIds = selectedKeywords.map((keyword) => keyword.id);

    const profileData: CreateProfileRequest = {
      nickname: nickname.trim(),
      mbti: mbti || undefined,
      keywordIds,
      balanceGameAnswers,
    };

    setIsLoading(true);

    try {
      if (isEdit) {
        // 수정 모드
        const updatedProfile = await profileService.updateMyProfile(
          profileData
        );
        console.log("프로필 수정 성공:", updatedProfile);
        alert("프로필이 수정되었습니다!");
        navigate("/profile");
      } else {
        // 생성 모드
        const createdProfile = await profileService.createProfile(profileData);
        console.log("프로필 생성 성공:", createdProfile);
        alert("프로필이 생성되었습니다!");
        navigate("/countdown");
      }
    } catch (error: any) {
      console.error(isEdit ? "프로필 수정 실패:" : "프로필 생성 실패:", error);

      if (error.response?.status === 409) {
        alert("이미 프로필이 존재합니다. 수정 페이지로 이동합니다.");
        // 필요시 수정 페이지로 이동하거나 수정 API 호출
      } else if (error.response?.status === 400) {
        alert(error.response?.data?.message || "입력 정보를 확인해주세요.");
      } else if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      } else {
        alert(
          `프로필 ${
            isEdit ? "수정" : "생성"
          } 중 오류가 발생했습니다. 다시 시도해주세요.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      <PageHeader
        title={isEdit ? "프로필 수정" : "프로필 설정"}
        backgroundColor="#fab0b8"
        showBackButton={isEdit}
      />

      <S.ProfileImageSection>
        <S.SectionTitle>프로필 이미지</S.SectionTitle>
        <S.ImageUploadContainer>
          <S.ImagePreview>
            {profileImagePreview ? (
              <img src={profileImagePreview} alt="프로필 미리보기" />
            ) : (
              <S.ImagePlaceholder>
                <span>📷</span>
                <p>이미지 선택</p>
              </S.ImagePlaceholder>
            )}
          </S.ImagePreview>
          <S.ImageUploadButton htmlFor="profile-image-input">
            이미지 업로드
          </S.ImageUploadButton>
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </S.ImageUploadContainer>
        <S.InputDescription>
          다른 사람들에게 보여질 프로필 사진입니다. (최대 5MB)
        </S.InputDescription>
      </S.ProfileImageSection>

      <S.NicknameSection>
        <S.SectionTitle>닉네임</S.SectionTitle>
        <S.InputField>
          <S.InputText
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNickname(e.target.value)
            }
            placeholder="닉네임을 입력하세요"
            maxLength={50}
          />
        </S.InputField>
        <S.InputDescription>
          다른 사람들에게 보여질 이름이에요. (최대 50자)
        </S.InputDescription>
      </S.NicknameSection>

      <S.MBTISection>
        <S.SectionTitle>MBTI</S.SectionTitle>
        <S.InputField>
          <S.InputText
            value={mbti}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMbti(e.target.value)
            }
            placeholder="MBTI를 입력하세요 (예: ENFP)"
          />
        </S.InputField>
        <S.InputDescription>자신의 MBTI를 입력해주세요.</S.InputDescription>
      </S.MBTISection>

      <S.BalanceGameSection>
        <S.SectionHeader>
          <S.SectionTitle>밸런스게임</S.SectionTitle>
          <S.SectionDescription>
            당신의 연애 스타일을 알려주세요 (5문제)
          </S.SectionDescription>
        </S.SectionHeader>

        <S.QuestionCard>
          <S.QuestionHeader>
            <S.ArrowButton
              onClick={handlePreviousQuestion}
              style={{ visibility: currentQuestion > 0 ? "visible" : "hidden" }}
            >
              ← 이전
            </S.ArrowButton>
            <S.QuestionNumber>
              {currentQuestion + 1} / {balanceGameQuestions.length}
            </S.QuestionNumber>
            <S.ArrowButton style={{ visibility: "hidden" }}>
              다음 →
            </S.ArrowButton>
          </S.QuestionHeader>

          <S.QuestionContent>
            <S.QuestionText>
              {balanceGameQuestions[currentQuestion].question}
            </S.QuestionText>
            {balanceGameQuestions[currentQuestion].options.map(
              (option, index) => (
                <S.OptionButton
                  key={index}
                  selected={selectedAnswers[currentQuestion] === index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                >
                  <S.OptionIcon>{option.icon}</S.OptionIcon>
                  <S.OptionText
                    selected={selectedAnswers[currentQuestion] === index}
                  >
                    {option.text}
                  </S.OptionText>
                </S.OptionButton>
              )
            )}
          </S.QuestionContent>
        </S.QuestionCard>
      </S.BalanceGameSection>

      <S.KeywordsSection>
        <S.SectionHeader>
          <S.SectionTitle>키워드 선택</S.SectionTitle>
          <S.SectionDescription>
            당신을 표현하는 키워드를 선택하세요. (최대 4개)
          </S.SectionDescription>
        </S.SectionHeader>

        <S.KeywordsGrid>
          {availableKeywords.map((keyword) => (
            <S.KeywordButton
              key={keyword.id}
              selected={selectedKeywords.some((k) => k.id === keyword.id)}
              onClick={() => handleKeywordToggle(keyword)}
            >
              {keyword.name}
            </S.KeywordButton>
          ))}
        </S.KeywordsGrid>
      </S.KeywordsSection>

      <S.NextButton onClick={handleNextStep} disabled={isLoading}>
        <S.NextButtonText>
          {isLoading ? "저장 중..." : isEdit ? "수정 완료" : "완료"}
        </S.NextButtonText>
      </S.NextButton>

      <NavBar />
    </S.ProfileContainer>
  );
};

export default ProfileSettingPage;
