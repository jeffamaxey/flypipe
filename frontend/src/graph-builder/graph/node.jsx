import React, {
    useCallback,
    useMemo,
    useRef,
    useEffect,
    useContext,
} from "react";
import { useReactFlow, Handle, Position } from "reactflow";
import Badge from "react-bootstrap/Badge";
import {
    refreshNodePositions,
    NODE_WIDTH,
    NODE_HEIGHT,
    consolidateEdge,
} from "../util";
import classNames from "classnames";
import textFit from "textfit";
import { GrNew } from "react-icons/gr";
import { NotificationContext } from "../../context";

const BaseNode = ({ data, isNewNode }) => {
    const graph = useReactFlow();
    const { nodeType, label } = data;
    const { addNotification } = useContext(NotificationContext);

    const handleConnect = useCallback(
        ({ source, target }) => {
            const sourceLabel = graph.getNode(source).data.label;
            const targetLabel = graph.getNode(target).data.label;
            const edge = graph
                .getEdges()
                .filter(
                    (edge) => edge.source === source && edge.target === target
                )[0];
            consolidateEdge(graph, edge);
            refreshNodePositions(graph);
            addNotification(
                `Dependency on ${sourceLabel} added to ${targetLabel}`
            );
        },
        [graph, addNotification]
    );

    const color = useMemo(() => {
        switch (nodeType) {
            case "pyspark":
                return "btn btn-outline-danger";
            case "pandas_on_spark":
                return "btn btn-outline-primary";
            case "pandas":
                return "btn btn-outline-success";
            case "spark_sql":
                return "btn btn-outline-info";
            default:
                return "btn btn-outline-warning";
        }
    }, [nodeType]);
    const klass = useMemo(() =>
        classNames(
            "d-flex",
            "container",
            isNewNode ? "justify-content-between" : "justify-content-center",
            "px-4",
            "py-2",
            "rounded",
            color
        )
    );

    const nodeTextRef = useRef(null);
    useEffect(() => {
        if (nodeTextRef.current) {
            textFit(nodeTextRef.current, { alignHoriz: true, alignVert: true });
        }
    }, [nodeTextRef.current, label]);

    // Within the node we must divide the space between the name and the badge
    const [nameWidth, badgeWidth] = useMemo(() => {
        if (isNewNode) {
            return ["col-12", ""];
        } else {
            return ["col-12", ""];
        }
    }, [isNewNode]);

    const onCheckValidConnection = useCallback(
        ({ source, target }) => {
            return graph.getNode(target).data.isNew;
        },
        [graph]
    );

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                id="target-handle"
                onConnect={handleConnect}
                isValidConnection={onCheckValidConnection}
            />
            <div
                className={klass}
                style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
            >
                <p
                    className={`${nameWidth} mb-0 me-2`}
                    style={{ textAlign: "center" }}
                    ref={nodeTextRef}
                >
                    {label}
                </p>
                {isNewNode && (
                    <Badge
                        pill
                        bg="warning"
                        className={`${badgeWidth} align-self-start fs-6 position-absolute node-badge`}
                        title="New node"
                        size="md"
                    >
                        <GrNew className="fs-4" />
                    </Badge>
                )}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="source-handle"
                onConnect={handleConnect}
                isValidConnection={onCheckValidConnection}
            />
        </>
    );
};

const ExistingNode = (props) => <BaseNode isNewNode={false} {...props} />;
const NewNode = (props) => <BaseNode isNewNode={true} {...props} />;

export { ExistingNode, NewNode };
