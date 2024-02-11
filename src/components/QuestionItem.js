import React, { useState } from "react";

function QuestionItem({ question, fetchQuestions }) {
  const { id, prompt, answers, correctIndex } = question;
  const [newCorrectIndex, setNewCorrectIndex] = useState(correctIndex);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        console.log("Question deleted successfully!");
        // Fetch questions after deleting a question
       await fetchQuestions();
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex,
        }),
      });
  
      if (response.ok) {
        console.log("Question updated successfully!");
        // Fetch questions after updating a question
        fetchQuestions();
      } else {
        console.error("Failed to update question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={newCorrectIndex}
          onChange={(e) => setNewCorrectIndex(parseInt(e.target.value))}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
      <button onClick={handleUpdate}>Update Question</button>
    </li>
  );
}

export default QuestionItem;
