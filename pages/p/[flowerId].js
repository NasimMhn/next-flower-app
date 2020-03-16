
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout'


const FlowerDetail = props => (

  < Layout >
    <p>{props.flower.common_name}</p>
    <p>{props.flower.blooming_season}</p>
  </Layout >
);

FlowerDetail.getInitialProps = async function (context) {
  const { flowerId } = context.query;

  const res = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${flowerId}.json`);
  const flower = await res.json();
  console.log("flower", flower)
  return { flower };
};

export default FlowerDetail;