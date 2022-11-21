import pyspark.pandas as ps
import pyspark.sql.functions as F

from pyspark.sql.types import DecimalType
from flypipe.dataframe.dataframe_wrapper import DataFrameWrapper
from flypipe.dataframe.spark_dataframe_wrapper import SparkDataFrameWrapper
from flypipe.exceptions import DataFrameMissingColumns
from flypipe.schema.types import Boolean, Byte, Binary, Integer, Short, Long, Float, Double, String, Decimal, Type, \
    Unknown
from flypipe.utils import DataFrameType


#TODO: is there a better place to put this?
ps.set_option('compute.ops_on_diff_frames', True)


class PandasOnSparkDataFrameWrapper(SparkDataFrameWrapper):
    DF_TYPE = DataFrameType.PANDAS_ON_SPARK

    def _select_columns(self, columns):
        try:
            return self.df[list(columns)]
        except KeyError:
            raise DataFrameMissingColumns(self.df.columns, list(columns))

    def get_df(self):
        return self.df.to_spark().to_pandas_on_spark()

    def get_column_flypipe_type(self, target_column):
        # Pandas on Spark is a Pandas API wrapper around an actual spark dataframe, this means converting the pandas on
        # spark df to a spark df gives a negligible performance hit. It's convenient for us to use a spark df here as
        # spark dataframes have much stricter types.
        spark_df = self.df.to_spark()
        return self._get_column_flypipe_type(spark_df, target_column)

    def _cast_column(self, column, flypipe_type, df_type):
        spark_df = self.df.to_spark()
        spark_df = spark_df.withColumn(column, spark_df[column].cast(df_type))
        self.df = spark_df.pandas_api()

    def _cast_column_decimal(self, column, flypipe_type):
        spark_df = self.df.to_spark()
        df_type = DecimalType(precision=flypipe_type.precision, scale=flypipe_type.scale)
        spark_df = spark_df.withColumn(column, spark_df[column].cast(df_type))
        self.df = spark_df.pandas_api()

    def _cast_column_date(self, column, flypipe_type):
        spark_df = self.df.to_spark()
        spark_df = spark_df.withColumn(column, F.to_date(F.col(column), flypipe_type.fmt))
        self.df = spark_df.pandas_api()

    def _cast_column_datetime(self, column, flypipe_type):
        spark_df = self.df.to_spark()
        spark_df = spark_df.withColumn(column, F.to_date(F.col(column), flypipe_type.fmt))
        self.df = spark_df.pandas_api()
