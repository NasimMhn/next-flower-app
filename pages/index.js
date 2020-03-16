import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

// Components
import Layout from '../components/MyLayout'



const Index = props => (
  <Layout>
    <h1>Flowers List</h1>
    <ul>
      {props.flowers.map(flower => (
        <li key={props.flowers.indexOf(flower)}>
          <Link href="/p/[flowerId]" as={`/p/${props.flowers.indexOf(flower)}`}>
            <a>{flower.common_name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function () {
  const res = await fetch(' https://flowers-mock-data.firebaseio.com/flowers.json');
  const flowers = await res.json();
  return { flowers }

};

export default Index;