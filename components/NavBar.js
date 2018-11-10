const styles = {
    navBarContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: "20px",
        zIndex: "99",
    },
}

const NavBar = () => (
    <>
        <div style={styles.navBarContainer} /> 
        <div style={{ marginBottom: "40px" }} />
    </>
);

export default NavBar;
