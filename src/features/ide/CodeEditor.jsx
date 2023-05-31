import {
  Card,
  Col,
  Input,
  Row,
  Menu,
  Select,
  Skeleton,
  Modal,
  Progress,
  Spin,
} from "antd";
import { Button } from "antd/lib/radio";
import axios from "axios";
import React, { useState } from "react";
import AceEditor from "react-ace-builds";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { FaPython } from "react-icons/fa";
import { DiSqllite } from "react-icons/di";

import {
  SiCplusplus,
  SiCsharp,
  SiJava,
  SiNodeDotJs,
  SiDart,
  SiSwift,
  SiKotlin,
} from "react-icons/si";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-cobalt";

const CodeEditor = ({ testCases, script, langMode, lang }) => {
  const [code, setCode] = useState(script ? script : "");
  const [isLoading, setLoading] = useState(false);
  const [stdin, setStdin] = useState("");
  const [languageMode, setLangMode] = useState(langMode ? langMode : "python");
  const [language, setLang] = useState(lang ? lang : "python3");
  const [versionIndex, setVerIndex] = useState(3);
  const [theme, setTheme] = useState("chrome");

  const [outputData, setOutput] = useState({
    output: "",
    statusCode: "",
    memory: "",
    cpuTime: "",
  });
  function onChange(newValue) {
    setCode(newValue);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoadingProgress] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setScore(0);
    setTotal(0);
    setProgress(0);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setScore(0);
    setTotal(0);
    setProgress(0);
  };
  const setIdeSettings = (mode, language, versionIndex) => {
    setLang(language);
    setVerIndex(versionIndex);
    setLangMode(mode);
  };

  const showOutput = async () => {
    setLoading(true);
    const data = await getCodeOutput(code, language, versionIndex, stdin);
    setOutput(data);
    setLoading(false);
  };

  const getCodeOutput = async (code, language, versionIndex, stdin) => {
    const { data } = await axios("https://jdoodle-api.herokuapp.com/", {
      method: "POST",
      data: {
        script: code,
        language,
        versionIndex,
        stdin,
      },
    });
    return data;
  };

  const evaluateCode = async () => {
    showModal();
    setLoadingProgress(true);
    let score = 0;
    let progress = 0;
    setTotal(testCases.length);
    let requests = [];
    let outputs = [];
    for (let testcase of testCases) {
      let input = testcase.input;
      let output = testcase.output;
      requests.push(getCodeOutput(code, language, versionIndex, input));
      outputs.push(output);
    }
    let responses = await Promise.all(requests);
    for (let i = 0; i < responses.length; i++) {
      let response = responses[i];
      if (response.output.trim() == outputs[i].trim()) {
        score++;
        setScore(score);
      }
      progress++;
      setProgress(progress);
    }
    setLoadingProgress(false);
  };

  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        recycle={false}
        tweenDuration={7000}
        width={width}
        height={height}
        numberOfPieces={600}
        run={score === total && score > 0}
      />

      <Menu
        mode="horizontal"
        style={{ margin: "10px" }}
        defaultSelectedKeys={[language]}
      >
        <Menu.Item
          onClick={() => {
            setIdeSettings("python", "python3", 3);
          }}
          icon={<FaPython />}
          key="python3"
        >
          Python 3.7
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            setIdeSettings("", "cpp17", 0);
          }}
          icon={<SiCplusplus />}
          key="cpp"
        >
          C++ 17
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("java", "java", 3);
          }}
          icon={<SiJava />}
          key="java"
        >
          Java 11
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("", "dart", 3);
          }}
          icon={<SiDart />}
          key="dart"
        >
          Dart
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("javascript", "nodejs", 3);
          }}
          icon={<SiNodeDotJs />}
          key="nodejs"
        >
          Nodejs
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("", "swift", 3);
          }}
          icon={<SiSwift />}
          key="swift"
        >
          Swift
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("", "kotlin", 2);
          }}
          icon={<SiKotlin />}
          key="kotlin"
        >
          Kotlin
        </Menu.Item>
        <Menu.Item
          icon={<DiSqllite />}
          onClick={() => {
            setIdeSettings("", "sql", 3);
          }}
          key="sql"
        >
          Sql
        </Menu.Item>
        <Menu.Item
          icon={<SiCsharp />}
          onClick={() => {
            setIdeSettings("csharp", "csharp", 2);
          }}
          key="csharp"
        >
          Csharp
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIdeSettings("golang", "go", 3);
          }}
          key="go"
        >
          Go lang
        </Menu.Item>
      </Menu>
      <Card title="Standard input" style={{ margin: "10px" }}>
        <Input.TextArea
          value={stdin}
          rows={4}
          onChange={(e) => setStdin(e.target.value)}
        ></Input.TextArea>
      </Card>
      <Row justify="center">
        <Button style={{ margin: "10px" }} onClick={showOutput}>
          Exectute
        </Button>
        <Select
          defaultValue="chrome"
          onChange={(val) => {
            setTheme(val);
          }}
          style={{ width: "200px", margin: "10px" }}
        >
          <Select.Option value="monokai">Monokai</Select.Option>
          <Select.Option value="chrome">Chrome</Select.Option>
          <Select.Option value="clouds">Clouds</Select.Option>
          <Select.Option value="cobalt">Cobalt</Select.Option>
        </Select>
        {testCases && (
          <Button style={{ margin: "10px" }} onClick={evaluateCode}>
            Evaluate
          </Button>
        )}
      </Row>

      <Row style={{ marginTop: 30 }} justify="space-around">
        <Col style={{ zIndex: 0 }}>
          <AceEditor
            placeholder="Write code here"
            mode={languageMode}
            value={code}
            theme={theme}
            name="blah2"
            onChange={onChange}
            fontSize={15}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: languageMode !== "",
              enableLiveAutocompletion: languageMode !== "",
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </Col>
        <Modal
          title={
            <p>
              Evaluating... <Spin spinning={loading} />
            </p>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <Col span={12}>
              <Progress
                type="circle"
                strokeColor="red"
                percent={100 * (progress / total)}
                success={{
                  percent: 100 * (score / total),
                  strokeColor: "green",
                }}
              />
            </Col>
            <Col>
              <pre>{`score: ${score}/${total}`}</pre>
              <pre>{`failed testcases: ${total - score}`}</pre>
            </Col>
          </Row>
        </Modal>
        <Col>
          <Card
            title="Output"
            extra={<Button onClick={() => setOutput("")}>Clear</Button>}
            style={{ height: "500px", minWidth: "350px", marginTop: "30px" }}
            actions={[
              <p>Status Code : {outputData.statusCode}</p>,
              <p>Memory: {outputData.memory}</p>,
              <p>Cpu Time: {outputData.cpuTime}</p>,
            ]}
          >
            <Skeleton
              paragraph={{ style: { height: "290px" }, rows: 8 }}
              loading={isLoading}
              active
            >
              <Card.Meta
                description={
                  <pre style={{ height: "310px" }}>{outputData.output}</pre>
                }
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CodeEditor;
