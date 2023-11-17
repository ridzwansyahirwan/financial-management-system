function Validation(values) {
    let errors = {};
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validate email
    if (!values.email) {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format";
    }
  
    // Validate password
    if (!values.password) {
      errors.password = "Password should not be empty";
    }
  
    return errors;
  }
  
  export default Validation;
  