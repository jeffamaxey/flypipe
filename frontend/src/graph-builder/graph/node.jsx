import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { useReactFlow, Handle, Position } from 'reactflow';
import Badge from 'react-bootstrap/Badge';
import { refreshNodePositions, NODE_WIDTH, NODE_HEIGHT } from '../util';
import classNames from 'classnames';
import textFit from 'textfit';


const BaseNode = ({ data, isNewNode }) => {
    const graph = useReactFlow();
    const { nodeType, label } = data;

    const handleConnect = useCallback(({source, target}) => {
        const edgeId = `${source}-${target}`;
        if (!graph.getEdge(edgeId)) {
            graph.addEdges({
                id: edgeId,
                source,
                target
            })
            refreshNodePositions(graph);
        }
    }, [graph]);

    const color = useMemo(() => {
        switch (nodeType) {
            case 'pyspark':
                return 'bg-danger';
            case 'pandas_on_spark':
                return 'bg-warning';
            case 'pandas':
                return 'bg-success';
            case 'spark_sql':
                return 'bg-info';
            default:
                return 'bg-secondary';
        }
    }, [nodeType]);
    const klass = useMemo(() => classNames(
        "d-flex",
        "container",
        isNewNode ? "justify-content-between" : "justify-content-center",
        "px-4",
        "py-2",
        "border",
        "border-3",
        "rounded",
        color,
    ));

    const nodeTextRef = useRef(null);
    useEffect(() => {
        if (nodeTextRef.current) {
            textFit(nodeTextRef.current, {alignHoriz: true, alignVert: true});
        }
    }, [nodeTextRef.current]);

    // Within the node we must divide the space between the name and the badge
    const [nameWidth, badgeWidth] = useMemo(() => {
        if (isNewNode) {
            return ['col-8', 'col-4'];
        } else {
            return ['col-12', ''];
        }
    }, [isNewNode]);

    return <>
        <Handle
            type="target"
            position={Position.Left}
            id="target-handle"
            isConnectable
        />
        <div className={klass} style={{width: NODE_WIDTH, height: NODE_HEIGHT}}>
            <p className={`${nameWidth} mb-0 me-2`} style={{textAlign: "center"}} ref={nodeTextRef}>{label}</p>
            {isNewNode && <Badge pill bg="primary" className={`${badgeWidth} align-self-start fs-6`}>New</Badge>}
        </div>
        <Handle
            type="source"
            position={Position.Right}
            id="source-handle"
            onConnect={handleConnect}
            isConnectable
        />
    </>
}

const ExistingNode = (props) => <BaseNode isNewNode={false} {...props}/>
const NewNode = (props) => <BaseNode isNewNode={true} {...props}/>

export {ExistingNode, NewNode};