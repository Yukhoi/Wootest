import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCourses,
  fetchCoursesByQuery,
} from "../../api-services/courses.api-service";
import { Course } from "../../models/course.model";
import { DataType } from "../../models/data-type.model";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as S from "./CourseList.styles";

type CourseListItem = DataType<Pick<Course, "_id">> & {
  title: string;
  description: string;
  code: string;
};

const columns: ColumnsType<CourseListItem> = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

function transformCoursesToDatasource(courses: Course[]): CourseListItem[] {
  return courses.map((course) => ({
    key: course._id,
    _id: course._id,
    code: course.code,
    title: course.title,
    description: course.description,
  }));
}

export const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesDataSource, setCoursesDataSource] = useState<CourseListItem[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getCourses() {
      if (!searchQuery) {
        const allCourses = await fetchCourses();
        setCourses(allCourses);
      } else {
        const filteredCourses = await fetchCoursesByQuery(searchQuery);
        setCourses(filteredCourses);
      }
    }
    getCourses();
  }, [searchQuery]);

  useEffect(() => {
    setCoursesDataSource(transformCoursesToDatasource(courses));
  }, [courses]);

  function handleCourseClick(course: CourseListItem) {
    navigate(`/courses/${course.code}`);
  }

  return (
    <S.Wrapper>
      <Card>
        <S.SearchInput
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a course by ID or name"
          prefix={<S.SearchIcon icon={faSearch} />}
        />
        <Table
          columns={columns}
          dataSource={coursesDataSource}
          onRow={(course) => ({
            onClick: () => handleCourseClick(course),
          })}
          scroll={{ y: "80vh" }}
        />
      </Card>
    </S.Wrapper>
  );
};
