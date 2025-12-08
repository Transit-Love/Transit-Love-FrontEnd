import React, { useState } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import PageHeader from "../../../components/PageHeader";
import profileService from "../../../api/profileService";
import type { CreateProfileRequest } from "../../../api/profileService";

const ProfileSettingPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [mbti, setMbti] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const balanceGameQuestions = [
    {
      question: "연애할 때 나는...",
      options: [
        { text: "친구 같은 연애", icon: "❤️" },
        { text: "설레는 연애", icon: "⚡" },
      ],
    },
    {
      question: "데이트를 할 때 나는...",
      options: [
        { text: "계획을 세우는 편", icon: "📅" },
        { text: "즉흥적인 편", icon: "🎯" },
      ],
    },
    {
      question: "갈등이 생겼을 때 나는...",
      options: [
        { text: "바로 해결하려고 함", icon: "⚔️" },
        { text: "시간을 두고 생각함", icon: "🤔" },
      ],
    },
    {
      question: "사랑을 표현할 때 나는...",
      options: [
        { text: "말로 표현하는 편", icon: "💬" },
        { text: "행동으로 보여주는 편", icon: "🎁" },
      ],
    },
    {
      question: "이상적인 연인과의 시간은...",
      options: [
        { text: "함께 뭔가를 하는 시간", icon: "🎮" },
        { text: "조용히 함께 있는 시간", icon: "📖" },
      ],
    },
  ];

  const availableKeywords: string[] = [
    "영화광",
    "게임러버",
    "독서광",
    "여행러버",
    "음식러버",
    "운동러버",
    "음악러버",
    "예술러버",
    "반려동물러버",
  ];

  const handleKeywordToggle = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
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

    // 키워드 ID는 임시로 인덱스+1을 사용 (실제로는 백엔드에서 제공되는 ID를 사용해야 함)
    const keywordIds = selectedKeywords.map(
      (keyword) => availableKeywords.indexOf(keyword) + 1
    );

    const profileData: CreateProfileRequest = {
      nickname: nickname.trim(),
      mbti: mbti || undefined,
      keywordIds,
      balanceGameAnswers,
    };

    setIsLoading(true);

    try {
      const createdProfile = await profileService.createProfile(profileData);
      console.log("프로필 생성 성공:", createdProfile);
      alert("프로필이 생성되었습니다!");
      navigate("/countdown");
    } catch (error: any) {
      console.error("프로필 생성 실패:", error);

      if (error.response?.status === 409) {
        alert("이미 프로필이 존재합니다. 수정 페이지로 이동합니다.");
        // 필요시 수정 페이지로 이동하거나 수정 API 호출
      } else if (error.response?.status === 400) {
        alert(error.response?.data?.message || "입력 정보를 확인해주세요.");
      } else if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      } else {
        alert("프로필 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      <PageHeader
        title="프로필 설정"
        backgroundColor="#fab0b8"
        showBackButton={false}
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
          {availableKeywords.map((keyword, index) => (
            <S.KeywordButton
              key={index}
              selected={selectedKeywords.includes(keyword)}
              onClick={() => handleKeywordToggle(keyword)}
            >
              {keyword}
            </S.KeywordButton>
          ))}
        </S.KeywordsGrid>
      </S.KeywordsSection>

      <S.NextButton onClick={handleNextStep} disabled={isLoading}>
        <S.NextButtonText>{isLoading ? "저장 중..." : "완료"}</S.NextButtonText>
      </S.NextButton>

      <NavBar />
    </S.ProfileContainer>
  );
};

export default ProfileSettingPage;
