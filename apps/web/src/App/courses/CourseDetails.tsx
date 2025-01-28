import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Alert, Button, List } from "antd";
import { fetchCourseDetails } from "../../api-services/courses.api-service";
import {
  fetchQuestionsByCourse,
  duplicateQuestion,
  updateQuestion,
} from "../../api-services/questions.api-services";
import { Course } from "../../models/course.model";
import { Question } from "../../models/question.model";
import { DataType } from "../../models/data-type.model";
import * as S from "./CourseDetails.styles";
import EditQuestionModal from "./EditQuestionModal";

type QuestionListItem = DataType<Pick<Question, "_id">> & {
  title: string;
};

function transformQuestionsToDataSource(
  questions: Question[]
): QuestionListItem[] {
  return questions.map((question) => ({
    key: question._id,
    _id: question._id,
    title: question.title,
    choices: question.choices,
  }));
}

export const CourseDetails = () => {
  const navigate = useNavigate();

  const { code } = useParams<{ code: string }>();

  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsDataSource, setQuestionsDataSource] = useState<
    QuestionListItem[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    async function getCourseDetailsAndQuestions() {
      if (!code) {
        setError("Invalid course code");
        setLoading(false);
        return;
      }
      try {
        const courseDetailsResult = await fetchCourseDetails(code);
        setCourseDetails(courseDetailsResult);
        const questions = await fetchQuestionsByCourse(code);
        setQuestions(questions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (code) {
      getCourseDetailsAndQuestions();
    } else {
      setError("Invalid course code");
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    setQuestionsDataSource(transformQuestionsToDataSource(questions));
  }, [questions]);

  const showEditModal = (question: Question) => {
    setCurrentQuestion(question);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentQuestion(null);
  };

  const handleSave = async (updatedQuestion: Question) => {
    try {
      if (!code) {
        setError("Invalid course code");
        setLoading(false);
        return;
      }

      await updateQuestion(updatedQuestion, code);
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === updatedQuestion._id ? updatedQuestion : q
        )
      );
      setIsModalVisible(false);
      setCurrentQuestion(null);
    } catch (err) {
      console.error("Failed to update question:", err);
    }
  };

  const handleDuplicate = async (questionId: string) => {
    if (!code) return;

    try {
      const duplicatedQuestion = await duplicateQuestion(questionId, code);
      setQuestions((prevQuestions) => [...prevQuestions, duplicatedQuestion]);
    } catch (err) {
      console.error("Failed to duplicate question:", err);
    }
  };

  if (loading) {
    return (
      <S.Wrapper>
        <Spin tip="Loading course details..." />
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper>
        <Alert message="Error" description={error} type="error" showIcon />
        <Button type="primary" onClick={() => navigate("/courses")}>
          Go Back to Course List
        </Button>
      </S.Wrapper>
    );
  }

  if (!courseDetails) {
    return (
      <S.Wrapper>
        <Alert
          message="Error"
          description="Course not found"
          type="error"
          showIcon
        />
        <Button type="primary" onClick={() => navigate("/courses")}>
          Go Back to Course List
        </Button>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <Card style={{ width: 800 }}>
        <S.TitleBar>
          <S.TitleBarButton onClick={() => navigateBack()}>
            Go Back to Course List
          </S.TitleBarButton>
          <S.Title>{courseDetails.title}</S.Title>
        </S.TitleBar>

        <h1>Questions</h1>

        {questionsDataSource.length > 0 ? (
          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <List
              bordered
              dataSource={questionsDataSource}
              renderItem={(item, index) => (
                <List.Item
                  key={item.key}
                  actions={[
                    <Button
                      type="link"
                      onClick={() => {
                        const question = questions.find(
                          (q) => q._id === item._id
                        );
                        if (question) showEditModal(question);
                      }}
                    >
                      Edit
                    </Button>,
                    <Button
                      type="link"
                      onClick={() => handleDuplicate(item._id)}
                    >
                      Duplicate
                    </Button>,
                  ]}
                  style={{ cursor: "pointer" }}
                >
                  <span>{index + 1}. </span>
                  {item.title}
                </List.Item>
              )}
            />
          </div>
        ) : (
          <p>No questions available.</p>
        )}
      </Card>

      <EditQuestionModal
        visible={isModalVisible}
        question={currentQuestion}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </S.Wrapper>
  );

  function navigateBack() {
    navigate("/courses");
  }
};
