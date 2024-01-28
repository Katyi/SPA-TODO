export const handleValidation = (newTask, setErrors) => {
  const formErrors = {};
  let formIsValid = true;

  // title
  if (!newTask.taskName) {
    formIsValid = false;
    formErrors.taskName = "Cannot be empty";
  }
  if (newTask.taskName.length > 30) {
    formIsValid = false;
    formErrors.taskName = "Cannot be more 30 characters";
  }
  // description
  if (!newTask.description) {
    formIsValid = false;
    formErrors.description = "Cannot be empty";
  }
  if (newTask.description.length > 50) {
    formIsValid = false;
    formErrors.description = "Cannot be more 50 characters";
  }
  // createDate
  if (!newTask.createDate) {
    formIsValid = false;
    formErrors.createDate = "Cannot be empty";
  } else if (newTask.createDate.length < 10) {
    formIsValid = false;
    formErrors.createDate = "Date is not valid";
  }
  // WorkTime 
  if (!newTask.workTime) {
    formIsValid = false;
    formErrors.workTime = "Cannot be empty";
  }
  //endDate
  if (!newTask.endDate) {
    formIsValid = false;
    formErrors.endDate = "Cannot be empty";
  } else if (newTask.endDate.length < 10) {
    formIsValid = false;
    formErrors.endDate = "Date is not valid";
  } else if (new Date(newTask.endDate.slice(6), newTask.endDate.slice(3, 5) - 1, newTask.endDate.slice(0, 2)) < new Date(newTask.createDate.slice(6), newTask.createDate.slice(3, 5) - 1, newTask.createDate.slice(0, 2))) {
    formIsValid = false;
    formErrors.endDate = "End Date cannot be less Create day";
  }
  // priority
  if (newTask.priority === 'Please choose an option') {
    formIsValid = false;
    formErrors.priority = "It's required";
  }
  setErrors(formErrors)
  return formIsValid;
};