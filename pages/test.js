import TitleBar  from "../components/TitleBar";
import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
const Test = () => (
    <div>
    <TitleBar />
    <Accordion>
        <AccordionSection title = "Arizona">
            <ResourceInfo url = "https://www.facebook.com/fluidarizona/" linkName = "Fluid Arizona" summary = "" />
            <ResourceInfo url = "http://bimetrophx.wix.com/bimetrophx" linkName = "Bisexuals in Metro Phoenix" />
        </AccordionSection>
        <AccordionSection title = "California">
            <ResourceInfo url = "http://www.meetup.com/ambiLA/" linkName = "AMBI Los Angeles" />
            <ResourceInfo url = "http://www.bayareabisexualnetwork.org/" linkName = "Bay Area Bixexual Network"  />
        </AccordionSection>
        <AccordionSection title = "Colorado">
            <ResourceInfo url = "localhost:3000/index" linkName = "test"/>
        </AccordionSection>
        <AccordionSection title = "District of Columbia">
            <ResourceInfo url = "localhost:3000/index" linkName = "test2"/>
        </AccordionSection>
    </Accordion>
    </div>
);

export default Test;
