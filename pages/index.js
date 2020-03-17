import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

// Components
import Layout from '../components/MyLayout'

// Styled components
import styled from 'styled-components';




const Index = props => (
  <Layout>
    <CardsWrapper>

      {props.flowers.map(flower => (
        <Link href="/p/[flowerId]" as={`/p/${props.flowers.indexOf(flower)}`} >

          <Card >

            <FlowerImg src={flower.cover_image ? flower.cover_image : '../no-image.png'} />
            <Text >{flower.common_name}</Text >



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

const CardsWrapper = styled.section`
 background-color: #8785a2;
  display: flex;
  justify-content:center;
  flex-wrap: wrap;
  width: 100%;
`

const FlowerImg = styled.img`
  width: 100%;
  height:350px;
  z-index: 0;
  border-radius: 10px;

`

// const FlowerLink = styled.a`
//   text-decoration: none;
//   position: relative;
//   width: 25%;
//   color: #fff;
//   text-decoration: none;
//   z-index: 1;

// ` 

const Text = styled.span`
  position: absolute;
  top:100px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 300px;
  color:#ffc7c7;
  margin-top: auto;
  margin-bottom: 0;
  font-size: 28px;
  text-align:center;
  z-index: 2;
  opacity: 0;
  
  
`

const Card = styled.div`
  width: 25%;
  min-width:350px;
  position: relative;
  z-index:1;
  margin: 15px 15px;
  &:hover ${FlowerImg} {
    filter: brightness(10%);
    
  }
  &:hover ${Text} {
    z-index: 5;
    display: block;
    opacity: 1;
  }


`









export default Index;

