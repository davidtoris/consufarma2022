import axios from "axios";

const Algo = ({algo}) => {
  console.log(algo)
  
  return (
    <div>      
      sdad
    </div>
  )
}

export async function getServerSideProps(context) {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return {
    props: {
      algo: response.data
    },
  }
}

export default Algo
