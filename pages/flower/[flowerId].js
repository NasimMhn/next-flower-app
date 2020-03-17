import React, { useState } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

// Styled components
import styled from 'styled-components';

// Components
import Layout from '../../components/MyLayout'
import { Header } from '../../components/Header'

import { useRouter } from 'next/router'

const FlowerDetail = props => {
  const router = useRouter()
  const { flowerId } = router.query
  const [message, setMessage] = useState('')

  return (

    <Layout>
      <Header>
        <FlexWrapper>
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
        </FlexWrapper>
      </Header>

      <DetailsSection>
        <FlowerDiv filepath={props.flower.cover_image ? props.flower.cover_image : '../no-image.png'} />

        <CoverContainer>

          <InfoContainer >
            <Title> {props.flower.common_name} <SubTitle>(Latin: {props.flower.latin_name})</SubTitle></Title>
            <Grid>
              <InfoTitle> Blooming season:</InfoTitle> <Text>{props.flower.blooming_season}</Text>
              <InfoTitle> Soil: </InfoTitle> <Text>{props.flower.soil.join(', ').toString()}</Text>
              <InfoTitle> Usage </InfoTitle><Text>{props.flower.notes}</Text>
              <InfoTitle alignSelf={'center'}> Needs sun: </InfoTitle><Text>{props.flower.sun === true ? "Yes ☀️" : "No ☁️"} </Text>
            </Grid>
          </InfoContainer>


          <CommentContainer>
            <FlexWrapper flexDirection={'column'}>
              <InputContainer>
                <TextArea
                  placeholder="Tell us what you think ..."
                  rows="2"
                  minLength="5"
                  maxLength="62"
                  onChange={e => setMessage(e.target.value)}
                />

                <CommentButton
                  onClick={e => postComment(message, flowerId)}
                >
                  Send comment
                    </CommentButton>

              </InputContainer>
              <CommentList>
                <hr />

                {props.comments.map(comment =>
                  <Comment
                    className="comment"
                    key={props.comments.indexOf(comment)}
                  >
                    💬 { comment}
                      </Comment>
                )}
              </CommentList>
            </FlexWrapper>
          </CommentContainer>

        </CoverContainer>

      </DetailsSection>
    </Layout >
  )
}

const postComment = async (message, flowerId) => {

  if (message.length !== 0) {
  await fetch(`https://flowers-mock-data.firebaseio.com/comments/nasimmhn/${flowerId}.json`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment: message })
  })
    .then(res => {
      console.log("response", res)
      location.reload();
    })
    .catch(err => console.error("Error", err))
  }
}


FlowerDetail.getInitialProps = async function (context) {
  const { flowerId } = context.query;

  const resFlower = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${flowerId}.json`);
  const flower = await resFlower.json();

  const resComments = await fetch(`https://flowers-mock-data.firebaseio.com/comments/nasimmhn/${flowerId}.json`)
  const commentsObject = await resComments.json()

  let comments = []
  if (commentsObject !== null) {
    comments = Object.values(commentsObject).map(i => i.comment).reverse().slice(0, 5)
  }

  return { flower, comments };
};

// Styling

const CommentButton = styled.button`
  margin: 5px 0px 15px 0px;
  padding: 10px;
  font-size: 15px;
  box-shadow: inset 1px 1px 0px 0px #e184f3;
	background: linear-gradient(to bottom, #c123de 5%, #381460 100%);
	background-color: #381460;
	border-radius:18px;
	border: 1px solid #381460;
	display: inline-block;
	cursor: pointer;
	color: white;
	font-family: Arial;
	font-size: 15px;
	font-weight: bold;
	padding: 12px 24px;
	text-shadow: 0px 0px 0px #038146;

  &:hover {
    background:linear-gradient(to bottom, #381460 5%, #381460 100%);
  }
  &:active {
    position:relative;
	  top:1px;
  }
  &:disabled {
    background:linear-gradient(to bottom, gray 5%, lightgray 100%);
    border: 1px solid black;
}
  
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`
const Title = styled.h1`
  font-size: 25px;
  font-weight: normal;
`
const SubTitle = styled.span`
  font-size: 20px;
  font-weight: normal;
  font-style: italic;
`
const InfoTitle = styled.span`
  padding: 3px;
  font-size: 17px;
  font-weight: bold;
  text-align: right;
  align-self: ${props => props.alignSelf};
`

const Text = styled.span`
  margin-left: 10px;
  padding: 3px;
  font-size: 17px;
  font-weight: normal;
  font-style: italic;
`
const InfoContainer = styled.div`
  min-width: 400px;
  margin: 30px;
  width: 400px;
  padding: 10px 25px 20px 25px;
  color: white;
  background-color: rgb(0,0,0, 0.8);
  -webkit-box-shadow: 8px 8px 4px -4px rgba(0,0,0,0.47);
  -moz-box-shadow: 8px 8px 4px -4px rgba(0,0,0,0.47);
  box-shadow: 8px 8px 4px -4px rgba(0,0,0,0.47);
`
const CommentContainer = styled.div`
  min-width: 300px;
  margin: 30px;
  height: 450px;
  width: 300px;
  padding: 20px;
  color: white;
  background-color: rgb(0,0,0, 0.95);
  -webkit-box-shadow: 8px 8px 4px -4px rgba(0,0,0,0.47);
  -moz-box-shadow: 8px 8px 4px -4px rgba(0,0,0,0.47);
  box-shadow: 8px 8px 4px -4px rgba(0,0,0,0.47);
`

const TextArea = styled.textarea`
  border-radius: 10px;
  font-size: 15px;
  width: 100%;
  resize: none;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: inset 1px 1px 0px 0px gray;
`

const CoverContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(33, 33,33, 0.1);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: 1000px) {
    justify-content: center;
  }

`

const FlowerDiv = styled.div`
  background-image: url(${props => props.filepath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  z-index: 0;
  border-radius: 0px;
`

const FlexWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`

const Icon = styled.svg`
  width: 50px;
  margin-right: 10px;
`

const BackButton = styled.span`
  display: inline-flex;
  color: white;
  align-items: center;
  font-weight: bolder;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  &:hover ${Icon}  {
    margin-right: 5px;
    transition: margin-right 0.2s ease-in-out
  }

`

const DetailsSection = styled.section`
  flex-grow: 1;
  height:100%;
  position: relative;
  height: 900px;
  width: 100%;

`

const InputContainer = styled.div`
`

const CommentList = styled.div`
`
const Comment = styled.div`
  margin: 8px 0px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  color: black;
  -webkit-box-shadow: inset 0px 0px 9px 5px rgba(148,148,148,1);
  -moz-box-shadow: inset 0px 0px 9px 5px rgba(148,148,148,1);
  box-shadow: inset 0px 0px 9px 5px rgba(148,148,148,1);

`

export default FlowerDetail