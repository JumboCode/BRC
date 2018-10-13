import TitleBar  from "../components/TitleBar";
import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
const Test = () => (
    <div>
        { /*
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
        */ }

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
    </div>
);

export default Test;
