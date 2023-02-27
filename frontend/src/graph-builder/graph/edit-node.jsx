import React, { useState, useCallback, useEffect } from "react";
import { Button, Offcanvas, Badge, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Tags } from "./tags";
import { NodeMoreInfo } from "./node-more-info";
import { BsInfoLg } from "react-icons/bs";
import CustomSelect from "./CustomSelect";
import DeleteNodeModal from "./delete-node-modal";
import { NodeOutput } from "./node-output";
import { useFormik } from "formik";
import NodeList from "./node-list";

const RE_LABEL = /^[a-zA-Z_]\w*$/;

export const EditNode = ({
    node,
    tagSuggestions,
    onClose: handleClose,
    onSave: handleSave,
}) => {
    const isReadOnly = !node.data.isNew;
    const validate = (values) => {
        const errors = {};

        if (!RE_LABEL.test(values.label)) {
            errors.label =
                "Invalid name- name must be a valid Python function name";
        }

        if (!values.nodeType) {
            errors.nodeType = "Type is required";
        }

        return errors;
    };
    const formState = useFormik({
        initialValues: node.data,
        validate,
        onSubmit: (values) => {
            // Name and label track the same information, so we need to sync name to any changes from label
            values.name = values.label;
            handleSave(values);
        },
    });
    useEffect(() => {
        formState.resetForm({
            values: node.data,
        });
    }, [node]);

    const nodeTypeOptions = [
        { value: "pandas_on_spark", label: "Pandas on Spark" },
        { value: "pyspark", label: "PySpark" },
        { value: "spark_sql", label: "Spark SQL" },
        { value: "pandas", label: "Pandas" },
    ];

    const [show, setShow] = useState(true);
    const [showDeleteNode, setShowDeleteNode] = useState(false);

    const handleShowDeleteNode = useCallback(() => {
        setShowDeleteNode(true);
    }, [setShowDeleteNode]);
    const handleCancelDeleteNode = useCallback(() => {
        setShowDeleteNode(false);
    }, [setShowDeleteNode]);
    const handleSubmitDeleteNode = useCallback(() => {
        setShowDeleteNode(false);
        handleClose();
    }, [setShowDeleteNode, handleClose]);

    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const onClickMoreInfo = useCallback(() => {
        setShowMoreInfo(true);
    }, [setShowMoreInfo]);
    const onClickCloseMoreInfo = useCallback(() => {
        setShowMoreInfo(false);
    }, [setShowMoreInfo]);

    const handleSetTags = useCallback(
        (tags) => {
            formState.setFieldValue("tags", tags);
        },
        [formState]
    );

    return (
        <>
            {showDeleteNode && (
                <DeleteNodeModal
                    nodeId={formState.values.nodeKey}
                    onCancel={handleCancelDeleteNode}
                    onSubmit={handleSubmitDeleteNode}
                    handleClose={handleCancelDeleteNode}
                />
            )}
            <NodeMoreInfo
                nodeData={formState.values}
                show={showMoreInfo}
                onClose={onClickCloseMoreInfo}
            />

            <Offcanvas
                show={show}
                // onHide={handleClose}
                placement="end"
                backdrop={false}
                scroll={true}
                className="node"
            >
                <Offcanvas.Header closeButton={false}>
                    <Offcanvas.Title className="w-100 d-flex justify-content-between">
                        <span>{isReadOnly ? "View Node" : "Edit Node"}</span>
                        <Button
                            variant="outline-secondary flypipe"
                            className="btn-sm float-end"
                            onClick={onClickMoreInfo}
                        >
                            <BsInfoLg />
                        </Button>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>
                        <span className="fw-semibold">Status</span>
                        <Badge
                            bg="success float-end"
                            className="text-uppercase"
                        >
                            active
                        </Badge>
                    </p>

                    <Form onSubmit={formState.handleSubmit}>
                        <fieldset disabled={isReadOnly}>
                            <Form.Control
                                type="text"
                                hidden={true}
                                id="id"
                                name="id"
                                defaultValue={formState.values.label}
                            />

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="label"
                                    name="label"
                                    value={formState.values.label}
                                    onChange={formState.handleChange}
                                />
                                {formState.errors.label ? (
                                    <div className="text-danger">
                                        {formState.errors.label}
                                    </div>
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Type
                                </Form.Label>
                                <CustomSelect
                                    id="nodeType"
                                    name="nodeType"
                                    options={nodeTypeOptions}
                                    value={formState.values.nodeType}
                                    onChange={(value) =>
                                        formState.setFieldValue(
                                            "nodeType",
                                            value.value
                                        )
                                    }
                                />
                                {formState.errors.nodeType ? (
                                    <div className="text-danger">
                                        {formState.errors.nodeType}
                                    </div>
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Tags
                                </Form.Label>
                                <Tags
                                    tags={formState.values.tags}
                                    tagSuggestions={tagSuggestions}
                                    onSetTags={handleSetTags}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Description
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    value={formState.values.description}
                                    onChange={formState.handleChange}
                                    style={{ height: "120px" }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Predecessors
                                </Form.Label>
                                {formState.values.predecessors.length > 0 ? (
                                    <NodeList
                                        nodeIds={formState.values.predecessors}
                                    />
                                ) : (
                                    <p>No predecessors</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Successors
                                </Form.Label>
                                {formState.values.successors.length > 0 ? (
                                    <NodeList
                                        nodeIds={formState.values.successors}
                                    />
                                ) : (
                                    <p>No successors</p>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    Output Schema
                                </Form.Label>
                                {formState.values.output &&
                                    formState.values.output.length > 0 && (
                                        <NodeOutput
                                            output={formState.values.output}
                                        />
                                    )}
                                {(!formState.values.output ||
                                    formState.values.output.length == 0) && (
                                    <p>No output declared</p>
                                )}
                            </Form.Group>
                        </fieldset>

                        <Row>
                            <Col>
                                {!isReadOnly && (
                                    <Button
                                        variant="outline-danger"
                                        onClick={handleShowDeleteNode}
                                    >
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    variant="outline-primary"
                                    className="me-2 float-end"
                                    type="submit"
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outline-secondary flypipe"
                                    className="me-2 float-end"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
