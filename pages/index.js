import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

// Components
import Layout from '../components/MyLayout'

// Styled components
import styled from 'styled-components';

import styles from '../components/Card.module.css'


const Index = props => (
  <Layout>
    <h1>Flowers List</h1>
    <CardWrapper>

      {props.flowers.map(flower => (
        <Link href="/p/[flowerId]" as={`/p/${props.flowers.indexOf(flower)}`}>
          <a>
            <Card key={props.flowers.indexOf(flower)}>

              <FlowerImg src={flower.cover_image ? flower.cover_image : '../no-image.png'} />
              <div>{flower.common_name}</div>



            </Card>
          </a>
        </Link>

      ))}
    </CardWrapper>
  </Layout>
);

Index.getInitialProps = async function () {
  const res = await fetch(' https://flowers-mock-data.firebaseio.com/flowers.json');
  const flowers = await res.json();
  return { flowers }

};

export default Index;


// Styling
const FlowerImg = styled.img`
  height: 300px;
  width: 300px;
`
const Card = styled.div`
  padding: 20px;
`


const CardWrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`