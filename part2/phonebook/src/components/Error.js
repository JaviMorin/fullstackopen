const Error = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null
    }
  
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  export default Error