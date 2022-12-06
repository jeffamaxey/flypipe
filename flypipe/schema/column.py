from flypipe.config import get_config
from flypipe.schema.types import Type


class Column:
    def __init__(self, name: str, type: Type, description: str = ""):
        self.name = name
        self.type = type
        if not description and get_config("require_schema_description"):
            raise ValueError(
                f"Descriptions on schema columns configured as mandatory but no description provided for column "
                f"{self.name}"
            )
        self.description = description

    def __repr__(self):
        return f'Column("{self.name}", {str(self.type)}, "{self.description}")'
