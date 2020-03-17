

const Layout = (props) => {
  return (
    <div style={layoutStyle}>
      {props.children}

      <style jsx global>{`

        body {
          margin: 0;
          padding: 0;
          font-family: 'Open Sans', sans-serif;
          background: #7f78d2;       
          height:100% !important;
          min-height: 100vh;
          width: 100%;
        }
        
        `}
      </style>


    </div>
  )
}







// Styling
const layoutStyle = {
  padding: 20,
  backgroundColor: '#ffc8bd',
  height: 'ienherit',
  width: ' 100'

}



export default Layout





