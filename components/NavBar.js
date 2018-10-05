const styles = {
    navBarContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "grey",
        padding: "20px",
    },
    navBarMargin: {
        marginBottom: "40px",
    }
}

const NavBar = () => (
    <>
        <div style={styles.navBarContainer} /> 
        <div style={styles.navBarMargin} />
    </>
);

/* No one deletes besides Erica */
// const NavBar = () => (
//     <div style="background-color:grey; padding:20px;"> 
//     </div>
// );

export default NavBar;
