import pandas as pd
from numpy import dtype

from flypipe.dataframe.dataframe_wrapper import DataFrameWrapper
from flypipe.exceptions import DataFrameMissingColumns
from flypipe.schema.types import (
    Boolean,
    Byte,
    Binary,
    Integer,
    Short,
    Long,
    Float,
    Double,
    String,
    Unknown,
    DateTime,
    Date,
)
from flypipe.utils import DataFrameType


class PandasDataFrameWrapper(DataFrameWrapper):
    DF_TYPE = DataFrameType.PANDAS
    FLYPIPE_TYPE_TO_DF_TYPE_MAP = {
        Boolean.key(): dtype("bool"),
        Byte.key(): dtype("int8"),
        Binary.key(): dtype("S"),
        Integer.key(): dtype("int32"),
        Short.key(): dtype("int16"),
        Long.key(): dtype("int64"),
        Float.key(): dtype("float32"),
        Double.key(): dtype("float64"),
        String.key(): dtype("<U0"),
    }
    DF_TYPE_TO_FLYPIPE_TYPE_MAP = {
        "boolean": Boolean(),
        "byte": Byte(),
        "binary": Binary(),
        "integer": Integer(),
        "short": Short(),
        "long": Long(),
        "floating": Float(),
        "double": Double(),
        "string": String(),
        "date": Date(),
        "datetime": DateTime(),
        "datetime64": DateTime(),
    }

    def _select_columns(self, columns):
        try:
            return self.df[list(columns)]
        except KeyError:
            raise DataFrameMissingColumns(self.df.columns, list(columns))

    def get_df(self):
        return self.df.copy()

    def get_column_flypipe_type(self, target_column):
        try:
            df_non_null = self.df[self.df[target_column].notnull()]
            df_type_name = pd.api.types.infer_dtype(
                df_non_null[target_column], skipna=True
            )
            return self.DF_TYPE_TO_FLYPIPE_TYPE_MAP[df_type_name]
        except KeyError:
            return Unknown()

    def _get_rows_for_cast(self, column, flypipe_type):
        rows = self.df[column].notnull()

        if flypipe_type.valid_values:
            # Get the first index of any invalid, non-null row value for the column
            invalid_values = ~self.df[column].loc[rows].isin(flypipe_type.valid_values)
            first_invalid_value = self.df[column].iloc[invalid_values.argmax()]
            # This is a bit hacky, but if all values are valid then argmax returns the first index, so we need to
            # double check that the first invalid value is actually invalid.
            if (
                    first_invalid_value
                    and first_invalid_value not in flypipe_type.valid_values
            ):
                raise ValueError(
                    f"Invalid type {flypipe_type.name} for column {column}, found incompatible row value "
                    f'"{first_invalid_value}"'
                )
        return rows

    def _cast_column(self, column, flypipe_type, df_type):
        rows = self._get_rows_for_cast(column, flypipe_type)

        self.df[column].loc[rows] = self.df[column].loc[rows].astype(df_type)

    def _cast_column_decimal(self, column, flypipe_type):
        rows = self._get_rows_for_cast(column, flypipe_type)

        self.df[column].loc[rows] = (
            self.df[column].loc[rows].astype(dtype("float64")).round(flypipe_type.scale)
        )

    def _cast_column_date(self, column, flypipe_type):
        return self._cast_column_date_or_timestamp(column, flypipe_type)

    def _cast_column_datetime(self, column, flypipe_type):
        return self._cast_column_date_or_timestamp(column, flypipe_type)

    def _cast_column_date_or_timestamp(self, column, flypipe_type):
        rows = self._get_rows_for_cast(column, flypipe_type)
        self.df[column].loc[rows] = pd.to_datetime(
            self.df[column].loc[rows], format=flypipe_type.fmt
        ).astype(dtype("datetime64[ns]"))
