const firstLetterUpper = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const imageUtil=(link)=>{
  const domain = new URL(link)
  return domain.host.replace("www.","")
}

export {
  firstLetterUpper,
  imageUtil
}