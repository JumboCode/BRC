const styles = {
    navBarContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "grey",
        padding: "20px",
    },
}

const NavBar = () => (
    <>
        <div style={styles.navBarContainer} /> 
        <div style={{ marginBottom: "40px" }} />
    </>
);

export default NavBar;
