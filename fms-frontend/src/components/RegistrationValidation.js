function Validation(values) {
    let errors = {};
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    // Validate name
    if (!values.name) {
      errors.name = "Name should not be empty";
    } else {
      errors.name = "";
    }
  
    // Validate email
    if (!values.email) {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format";
    } else {
      errors.email = "";
    }
  
    // Validate password
    if (!values.password) {
      errors.password = "Password should not be empty";
    } 
    // else if (!passwordPattern.test(values.password)) {
    //   errors.password = "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be 8 characters or longer";
    // } 
    else {
      errors.password = "";
    }
  
    return errors;
  }
  
  export default Validation;
  