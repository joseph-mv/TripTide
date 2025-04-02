export const today = new Date().toISOString().split("T")[0];
  

export const validateDateRange=(startDate,endDate)=>{
    if (new Date(startDate) > new Date(endDate)) {
      return({success:false, message:"Start date cannot be later than end date"});        
    }
    return ({success:true})
  }

