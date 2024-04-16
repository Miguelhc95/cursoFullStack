const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        return state + 5
      case 'OK':
        return state + 4
      case 'BAD':
        return state + 2
      case 'ZERO':
        return 0
      default: return state
    }
  
  }
  
  export default counterReducer