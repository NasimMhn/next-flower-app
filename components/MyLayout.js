
import Header from './Header'

const Layout = (props) => {
  return (
    <div style={layoutStyle}>
      <Header />
      {props.children}
    </div>
  )
}

// Styling
const layoutStyle = {
  margin: 20,
  padding: 20,
  backgroundColor: '#ffe2e2',
}



export default Layout


