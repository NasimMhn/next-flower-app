import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

// Components
import Layout from '../components/MyLayout'

// Styled components
import styled from 'styled-components';


const Index = props => (
  <Layout>
    <Title>Flower</Title>
    <CardsWrapper>
      {props.flowers.map(flower => (
        <Link href="/flower/[flowerId]" as={`/flower/${props.flowers.indexOf(flower)}`} >

          <Card >
            <FlowerDiv filepath={flower.cover_image ? flower.cover_image : '../no-image.png'} />
            <OverlayDiv >{flower.common_name}</OverlayDiv>
          </Card>
        </Link>

      ))}
    </CardsWrapper>
  </Layout>
);

Index.getInitialProps = async function () {
  const res = await fetch(' https://flowers-mock-data.firebaseio.com/flowers.json');
  const flowers = await res.json();
  return { flowers }

};

// Styling

const Title = styled.h1`
 
`

const CardsWrapper = styled.section`
 background-color: black;
  display: flex;
  justify-content:center;
  flex-wrap: wrap;
  width: 100%;
`

const FlowerDiv = styled.div`
  background-image: url(${props => props.filepath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height:350px;
  z-index: 0;
  border-radius: 10px;
`

const OverlayDiv = styled.div`
  position: absolute;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
  color: #ffc7c7;
  font-size: 28px;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  width: 25%;
  min-width:350px;
  position: relative;
  z-index:1;
  margin: 15px 15px;
  border: 1px solid transparent;
  border-radius: 10px;
  &&:hover {
    border: 1px solid white;
    transition: 0.4s;
  }
  &:hover ${FlowerDiv} {
    filter: brightness(10%);
    transition: 0.4s;
  }
  &:hover ${OverlayDiv} {
    z-index: 2;
  }
`



export default Index;

