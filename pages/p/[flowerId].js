
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout'
import styles from '../../components/Card.module.css'


const FlowerDetail = props => (

  < Layout >
    <p>Flower name: {props.flower.common_name}</p>
    <p>Flower latin name: {props.flower.latin_name}</p>
    <p>Blooming season:{props.flower.blooming_season}</p>
    <p> Soil:{props.flower.soil.toString()}</p>
    <p> Sun: {props.flower.sun}</p>
    {props.flower.cover_image ? <img src={props.flower.cover_image} className={styles.flowerImg} /> : null}
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