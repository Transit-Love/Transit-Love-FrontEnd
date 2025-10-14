import React, { useState } from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import Back from '../../assets/back.png'
import Back2 from '../../assets/back2.png'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('귀여운곰돌이');
  const [mbti, setMbti] = useState('ENFP');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number | null}>({});

  const balanceGameQuestions = [
    {
      question: "연애할 때 나는...",
      options: [
        { text: "친구 같은 연애", icon: "❤️" },
        { text: "설레는 연애", icon: "⚡" }
      ]
    },
    {
      question: "데이트를 할 때 나는...",
      options: [
        { text: "계획을 세우는 편", icon: "📅" },
        { text: "즉흥적인 편", icon: "🎯" }
      ]
    },
    {
      question: "갈등이 생겼을 때 나는...",
      options: [
        { text: "바로 해결하려고 함", icon: "⚔️" },
        { text: "시간을 두고 생각함", icon: "🤔" }
      ]
    },
    {
      question: "사랑을 표현할 때 나는...",
      options: [
        { text: "말로 표현하는 편", icon: "💬" },
        { text: "행동으로 보여주는 편", icon: "🎁" }
      ]
    },
    {
      question: "이상적인 연인과의 시간은...",
      options: [
        { text: "함께 뭔가를 하는 시간", icon: "🎮" },
        { text: "조용히 함께 있는 시간", icon: "📖" }
      ]
    }
  ];

  const availableKeywords = [
    '영화광', 'ENFP', '게임러버', '독서광', '여행러버', 
    '음식러버', '운동러버', '음악러버', '예술러버', '반려동물러버'
  ];

  const handleKeywordToggle = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else if (selectedKeywords.length < 4) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < balanceGameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleNextStep = () => {
    console.log('다음 단계로 이동');
    navigate('/countdown');
  };

  return (
    <S.ProfileContainer>
      <S.BackgroundImage />
      
      <S.Header>
        <S.NavBar>
          <S.BackButton onClick={() => navigate(-1)}>
            <img src={Back} alt="back" />
          </S.BackButton>
          <S.HeaderTitle>프로필 설정</S.HeaderTitle>
        </S.NavBar>
      </S.Header>

      <S.StatusIcons />
      <S.TimeDisplay />

      <S.NicknameSection>
        <S.SectionTitle>닉네임</S.SectionTitle>
        <S.InputField>
          <S.InputText 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="귀여운곰돌이"
          />
        </S.InputField>
        <S.InputDescription>다른 사람들에게 보여질 이름이에요. (10글자 이하)</S.InputDescription>
      </S.NicknameSection>

      <S.MBTISection>
        <S.SectionTitle>MBTI</S.SectionTitle>
        <S.InputField>
          <S.InputText 
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            placeholder="ENFP"
          />
        </S.InputField>
        <S.InputDescription>자신의 MBTI를 입력해주세요.</S.InputDescription>
      </S.MBTISection>

      <S.BalanceGameSection>
        <S.SectionHeader>
          <S.SectionTitle>밸런스게임</S.SectionTitle>
          <S.SectionDescription>당신의 연애 스타일을 알려주세요 (5문제)</S.SectionDescription>
        </S.SectionHeader>
        
        <S.QuestionCard>
          <S.QuestionHeader>
            <S.QuestionNumber>{currentQuestion + 1}</S.QuestionNumber>
            <S.ArrowButton onClick={handleNextQuestion}>
              <img src={Back2} alt="arrow" />
            </S.ArrowButton>
          </S.QuestionHeader>
          
          <S.QuestionContent>
            <S.QuestionText>{balanceGameQuestions[currentQuestion].question}</S.QuestionText>
            {balanceGameQuestions[currentQuestion].options.map((option, index) => (
              <S.OptionButton 
                key={index}
                selected={selectedAnswers[currentQuestion] === index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
              >
                <S.OptionIcon>{option.icon}</S.OptionIcon>
                <S.OptionText selected={selectedAnswers[currentQuestion] === index}>{option.text}</S.OptionText>
              </S.OptionButton>
            ))}
          </S.QuestionContent>
        </S.QuestionCard>
      </S.BalanceGameSection>

      <S.KeywordsSection>
        <S.SectionHeader>
          <S.SectionTitle>키워드 선택</S.SectionTitle>
          <S.SectionDescription>당신을 표현하는 키워드를 선택하세요. (최대 4개)</S.SectionDescription>
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

      <S.NextButton onClick={handleNextStep}>
        <S.NextButtonText>다음 단계</S.NextButtonText>
      </S.NextButton>
    </S.ProfileContainer>
  );
};

export default ProfilePage;