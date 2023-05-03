import CreateTrans from "@/components/transcript/CreateTrans";
import TransHistory from "@/components/transcript/TransHistory";
import React, { useContext, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";

const transcript = () => {
  return (
    <div className="mt-2">
      <Tabs
        defaultActiveKey="tab1"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="tab1" title="Create Transcripts">
          <CreateTrans />
        </Tab>
        <Tab eventKey="tab2" title="Study Transcripts">
          <TransHistory />
        </Tab>
      </Tabs>
    </div>
  );
};

export default transcript;
