import pandas as pd
from flypipe.catalog import Catalog
from flypipe import node
from flypipe.schema import Schema, Column
from flypipe.schema.types import String


@node(type="pandas")
def t1():
    return pd.DataFrame({"c1": [1, 2, 3]})


@node(type="pandas", dependencies=[t1], output=Schema([Column("c1", String(), "bla")]))
def t2(t1):
    return t1


@node(type="pandas", dependencies=[t1], output=Schema([Column("c1", String(), "bla")]))
def t3(t1):
    return t1


class TestCatalog:
    """Tests for Catalog"""

    def test_node_successor(self):
        """
        We have an attribute to store each node's successor, this must be computed on the fly as we don't have this
        information directly on the node object unlike the other attributes. Ensure this is working properly in this
        test.
        """
        catalog = Catalog()
        catalog.register_node(t2)
        catalog.register_node(t3)
        assert sorted(
            [
                (node_def["name"], node_def["successors"])
                for node_def in catalog.get_node_defs()
            ]
        ) == [("t1", ["t2", "t3"]), ("t2", []), ("t3", [])]

    def test_node_successor_duplicate(self):
        """
        If we accidentally register the same node multiple times the catalog should avoid making duplicate successor
        entries.
        """
        catalog = Catalog()
        catalog.register_node(t2)
        catalog.register_node(t2)
        catalog.register_node(t1)
        assert sorted(
            [
                (node_def["name"], node_def["successors"])
                for node_def in catalog.get_node_defs()
            ]
        ) == [("t1", ["t2"]), ("t2", [])]

    def test_get_node_defs(self):
        catalog = Catalog()
        catalog.register_node(t2)
        catalog.register_node(t3)
        assert catalog.get_node_defs() == [
            {
                "description": "No description",
                "filePath": "flypipe\\catalog_test.py",
                "importCmd": "from flypipe.catalog_test import t2",
                "key": "flypipe_catalog_test_function_t2_t2",
                "name": "t2",
                "predecessors": ["t1"],
                "schema": ["c1"],
                "successors": [],
                "tags": ["pandas", "Transformation"],
            },
            {
                "description": "No description",
                "filePath": "flypipe\\catalog_test.py",
                "importCmd": "from flypipe.catalog_test import t1",
                "key": "flypipe_catalog_test_function_t1_t1",
                "name": "t1",
                "predecessors": [],
                "schema": [],
                "successors": ["t2", "t3"],
                "tags": ["pandas", "Transformation"],
            },
            {
                "description": "No description",
                "filePath": "flypipe\\catalog_test.py",
                "importCmd": "from flypipe.catalog_test import t3",
                "key": "flypipe_catalog_test_function_t3_t3",
                "name": "t3",
                "predecessors": ["t1"],
                "schema": ["c1"],
                "successors": [],
                "tags": ["pandas", "Transformation"],
            },
        ]
