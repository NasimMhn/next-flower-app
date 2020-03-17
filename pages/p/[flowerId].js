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
    <>
      < Layout >
        <Link href="/">
          <button>
            return
          </button>
        </Link>

        <div className="flower-card">
          <FlowerImg src={props.flower.cover_image ? props.flower.cover_image : '../no-image.png'} />
          <p>Flower name: {props.flower.common_name}</p>
          <p>Flower latin name: {props.flower.latin_name}</p>
          <p>Blooming season:{props.flower.blooming_season}</p>
          <p>Soil: {props.flower.soil.toString()}</p>
          <p>Sun: {props.flower.sun}</p>
        </div>

        <div className="post-comment-card">
          <textarea onChange={e => setMessage(e.target.value)} />
          <div>
            <button onClick={e => postComment(message, flowerId)}>Send comment</button>
          </div>

        </div>


        <div className="comments-card">
          {props.comments.map(comment =>
            <div
              className="comment"
              key={props.comments.indexOf(comment)}
            >
              {comment}
            </div>
          )}
        </div>
      </Layout >

    </>
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

const FlowerImg = styled.img`
  height: 300px;
  width: 300px;
`


export default FlowerDetail