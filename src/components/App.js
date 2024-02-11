import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handlePageChange = (newPage) => {
    // Fetch questions when switching to the 'View Questions' page
    if (newPage === "List") {
      fetchQuestions();
    }
    setPage(newPage);
  };

  const [page, setPage] = useState("List");

  return (
    <main>
      <AdminNavBar onChangePage={handlePageChange} />
      {page === "Form" ? <QuestionForm fetchQuestions={fetchQuestions} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
