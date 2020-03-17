

const Layout = (props) => {
  return (
    <div style={layoutStyle}>
      {props.children}

      <style jsx global>{`

        body {
          margin: 0;
          padding: 0;
          background: black;       
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
  padding: 0,
  margin: 0,
  backgroundColor: '#381460',
  height: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}



export default Layout





