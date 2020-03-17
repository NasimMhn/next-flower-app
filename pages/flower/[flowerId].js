import React, { useState } from 'react'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout'
import { useRouter } from 'next/router'


// Styled components
import styled from 'styled-components';



const FlowerDetail = props => {
  const router = useRouter()
  const { flowerId } = router.query
  const [message, setMessage] = useState()

  return (

    <Layout>
      <Link href="/">
        <BackButton>
          <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <path d="M27 14.5C27 7.596441 21.4035594 2 14.5 2S2 7.596441 2 14.5 7.5964406 27 14.5 27 27 21.403559 27 14.5zm-19.3388348-.353553l7.4852814-7.485282c.1952622-.195262.5118446-.195262.7071068 0l2.1213203 2.121321c.1952622.195262.1952622.511844 0 .707106L12.9644661 14.5l5.0104076 5.010408c.1952622.195262.1952622.511844 0 .707106l-2.1213203 2.121321c-.1952622.195262-.5118446.195262-.7071068 0l-7.4852814-7.485282c-.19799-.19799-.197989-.509117 0-.707106z"
              fill="#fff"
              fillRule="evenodd">
            </path>
          </Icon>
          Back to flowers
          </BackButton>
      </Link>


      <Title> {props.flower.common_name}</Title>
      <DetailWrapper>
        <ContentWrapper >
          <ImgContainer>
            <FlowerImg src={props.flower.cover_image ? props.flower.cover_image : '../no-image.png'} />
          </ImgContainer>

          <InfoContainer >
            <p>Flower latin name: {props.flower.latin_name}</p>
            <p>Blooming season:{props.flower.blooming_season}</p>
            <p>Soil: {props.flower.soil.join(', ').toString()}</p>
            <p>Usage {props.flower.notes}</p>
            <p>Sun: {props.flower.sun === true ? "☀️" : "No"}</p>
          </InfoContainer>
        </ContentWrapper>

        <ContentWrapper>

          <InputContainer>
            <textarea onChange={e => setMessage(e.target.value)} />
            <div>
              <button onClick={e => postComment(message, flowerId)}>Send comment</button>
            </div>
          </InputContainer>
          <CommentContainer>
            {props.comments.map(comment =>
              <div
                className="comment"
                key={props.comments.indexOf(comment)}
              >
                {comment}
              </div>
            )}
          </CommentContainer>

        </ContentWrapper>


      </DetailWrapper>
    </Layout >


  )
}

const postComment = async (message, flowerId) => {
  console.log("MESSAGE in postComment", message, flowerId)

  await fetch(`https://flowers-mock-data.firebaseio.com/comments/nasimmhn/${flowerId}.json`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment: message })
  })
    .then(res => console.log("response", res))
    .catch(err => console.error("Error", err))

}


FlowerDetail.getInitialProps = async function (context) {


  const { flowerId } = context.query;

  const resFlower = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${flowerId}.json`);
  const flower = await resFlower.json();

  const resComments = await fetch(`https://flowers-mock-data.firebaseio.com/comments/nasimmhn/${flowerId}.json`)
  const commentsObject = await resComments.json()

  let comments = []
  if (commentsObject !== null) {
    comments = Object.values(commentsObject).map(i => i.comment)
  }
  return { flower, comments };
};








// Styling


const Title = styled.h1`
 text-align:center;
`

const BackButton = styled.span`
  position: relative;
  display: inline-flex;
  color: #512b58;
  align-items: center;
  font-weight: bolder;
  font-size: 18px;
  left: 20px;
  top: 20px;
  cursor: pointer;
 
`

const Icon = styled.svg`
  width: 50px;
  margin-right: 10px;
  transition: margin-right 0.2s ease-in-out;
  &&:hover  {
    margin-right: 5px;
  }
 
`

const FlowerImg = styled.img`
  height: 300px;
  width: 300px;
`


const DetailWrapper = styled.section`
  height:100%;
  min-height:900px;
  background-color:#cff1ef;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`

const ContentWrapper = styled.div`
  min-height: 400px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : "row"};
  justify-content: ${props => props.justify ? props.justify : "space-around"};
`




const ImgContainer = styled.div`
`

const InfoContainer = styled.div`
`



const InputContainer = styled.div`
`


const CommentContainer = styled.div`
`






export default FlowerDetail