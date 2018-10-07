import TitleBar  from "../components/TitleBar";
import Accordion from "../components/Accordion";
import AccordionSection from "../components/AccordionSection";
import ResourceInfo from "../components/ResourceInfo";
const Test = () => (
    <div>
    <TitleBar />
    <Accordion>
        <AccordionSection title = "test">
            <ResourceInfo url = "localhost:3000/index" linkName = "link1" summary = "Here we are" />
        </AccordionSection>
        <AccordionSection title = "test2">
            <ResourceInfo url = "localhost:3000/index" linkName = "link2" summary = "Here we are again" />
        </AccordionSection>
    </Accordion>
    </div>
);

export default Test;
