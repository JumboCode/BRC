import TitleBar  from "../components/TitleBar";
import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
const Test = () => (
    <Accordion>
        <AccordionSection title = "Arizona">
            <ResourceInfo list = {[["https://www.facebook.com/fluidarizona/","Fluid arizona"], ["http://bimetrophx.wix.com/bimetrophx", "Bisexuals in Metro Phoenix"]]} />
        </AccordionSection>
        <AccordionSection title = "California">
            <ResourceInfo list = {[["http://www.meetup.com/ambiLA/","AMBI Los Angeles"], ["http://www.bayareabisexualnetwork.org/", "Bay Area Bisexual Network"]]}/>
        </AccordionSection>
        <AccordionSection title = "Colorado">
            <ResourceInfo list = {[["Nothing", "Test1"]]} />
        </AccordionSection>
        <AccordionSection title = "District of Columbia">
            <ResourceInfo list = {[["Nothing2", "Test2"]]} />
        </AccordionSection>
    </Accordion>
);

export default Test;
