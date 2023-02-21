import React, { useCallback } from "react";
import ReactFlow, {
    addEdge,
    ConnectionLineType,
    useNodesState,
    useEdgesState,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

const initialNodes = [
    {
        data: { label: "raw_salesforce.loan__loan_account__c" },
        id: "spark_raw_salesforce_loan__loan_account__c",
    },
    {
        data: { label: "raw_salesforce.genesis__applications__c" },
        id: "spark_raw_salesforce_genesis__applications__c",
    },
    {
        data: { label: "raw_salesforce.loan__loan_product__c" },
        id: "spark_raw_salesforce_loan__loan_product__c",
    },
    {
        data: { label: "curated_lms.loanaccount" },
        id: "spark_curated_lms_loanaccount",
    },
    {
        data: { label: "raw_salesforce.account" },
        id: "spark_raw_salesforce_account",
    },
    {
        data: { label: "rename_spark_raw_salesforce_loan__loan_product__c" },
        id: "rename_spark_raw_salesforce_loan__loan_product__c",
    },
    {
        data: { label: "rename_spark_raw_salesforce_loan__loan_account__c" },
        id: "rename_spark_raw_salesforce_loan__loan_account__c",
    },
    {
        data: { label: "rename_spark_raw_salesforce_genesis__applications__c" },
        id: "rename_spark_raw_salesforce_genesis__applications__c",
    },
    {
        data: { label: "rename_spark_curated_lms_loanaccount" },
        id: "rename_spark_curated_lms_loanaccount",
    },
    {
        data: { label: "raw_salesforce.contact" },
        id: "spark_raw_salesforce_contact",
    },
    {
        data: { label: "ref.Industry_Classification" },
        id: "spark_ref_Industry_Classification",
    },
    {
        data: {
            label: "raw_salesforce.genesis__application_business_information__c",
        },
        id: "spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        data: { label: "raw_salesforce.genesis__applications__history" },
        id: "spark_raw_salesforce_genesis__applications__history",
    },
    {
        data: { label: "raw_salesforce.promotion__c" },
        id: "spark_raw_salesforce_promotion__c",
    },
    {
        data: { label: "transform_spark_raw_salesforce_loan__loan_product__c" },
        id: "transform_spark_raw_salesforce_loan__loan_product__c",
    },
    {
        data: { label: "rename_spark_raw_salesforce_account" },
        id: "rename_spark_raw_salesforce_account",
    },
    {
        data: { label: "transform_spark_raw_salesforce_loan__loan_account__c" },
        id: "transform_spark_raw_salesforce_loan__loan_account__c",
    },
    {
        data: {
            label: "transform_spark_raw_salesforce_genesis__applications__c",
        },
        id: "transform_spark_raw_salesforce_genesis__applications__c",
    },
    {
        data: { label: "transform_spark_curated_lms_loanaccount" },
        id: "transform_spark_curated_lms_loanaccount",
    },
    {
        data: { label: "standard_spark_raw_salesforce_loan__loan_account__c" },
        id: "standard_spark_raw_salesforce_loan__loan_account__c",
    },
    {
        data: {
            label: "standard_spark_raw_salesforce_genesis__applications__c",
        },
        id: "standard_spark_raw_salesforce_genesis__applications__c",
    },
    {
        data: { label: "standard_spark_raw_salesforce_loan__loan_product__c" },
        id: "standard_spark_raw_salesforce_loan__loan_product__c",
    },
    {
        data: { label: "standard_spark_curated_lms_loanaccount" },
        id: "standard_spark_curated_lms_loanaccount",
    },
    {
        data: { label: "rename_spark_raw_salesforce_contact" },
        id: "rename_spark_raw_salesforce_contact",
    },
    {
        data: { label: "rename_spark_ref_Industry_Classification" },
        id: "rename_spark_ref_Industry_Classification",
    },
    {
        data: { label: "transform_spark_raw_salesforce_account" },
        id: "transform_spark_raw_salesforce_account",
    },
    {
        data: {
            label: "rename_spark_raw_salesforce_genesis__application_business_information__c",
        },
        id: "rename_spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        data: {
            label: "rename_spark_raw_salesforce_genesis__applications__history",
        },
        id: "rename_spark_raw_salesforce_genesis__applications__history",
    },
    {
        data: { label: "rename_spark_raw_salesforce_promotion__c" },
        id: "rename_spark_raw_salesforce_promotion__c",
    },
    {
        data: { label: "standard_spark_raw_salesforce_account" },
        id: "standard_spark_raw_salesforce_account",
    },
    { data: { label: "conformed_product" }, id: "conformed_product" },
    { data: { label: "conformed_contract" }, id: "conformed_contract" },
    { data: { label: "conformed_application" }, id: "conformed_application" },
    {
        data: { label: "transform_spark_raw_salesforce_contact" },
        id: "transform_spark_raw_salesforce_contact",
    },
    {
        data: { label: "transform_spark_ref_Industry_Classification" },
        id: "transform_spark_ref_Industry_Classification",
    },
    {
        data: {
            label: "transform_spark_raw_salesforce_genesis__application_business_information__c",
        },
        id: "transform_spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        data: {
            label: "transform_spark_raw_salesforce_genesis__applications__history",
        },
        id: "transform_spark_raw_salesforce_genesis__applications__history",
    },
    {
        data: { label: "transform_spark_raw_salesforce_promotion__c" },
        id: "transform_spark_raw_salesforce_promotion__c",
    },
    {
        data: { label: "standard_spark_raw_salesforce_contact" },
        id: "standard_spark_raw_salesforce_contact",
    },
    {
        data: { label: "standard_spark_ref_Industry_Classification" },
        id: "standard_spark_ref_Industry_Classification",
    },
    { data: { label: "conformed_account" }, id: "conformed_account" },
    {
        data: { label: "application_was_settled" },
        id: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
    },
    {
        data: {
            label: "standard_spark_raw_salesforce_genesis__application_business_information__c",
        },
        id: "standard_spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        data: {
            label: "standard_spark_raw_salesforce_genesis__applications__history",
        },
        id: "standard_spark_raw_salesforce_genesis__applications__history",
    },
    {
        data: { label: "standard_spark_raw_salesforce_promotion__c" },
        id: "standard_spark_raw_salesforce_promotion__c",
    },
    { data: { label: "conformed_contact" }, id: "conformed_contact" },
    {
        data: { label: "conformed_industry_classification" },
        id: "conformed_industry_classification",
    },
    {
        data: { label: "account_country_code" },
        id: "datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code",
    },
    {
        data: { label: "completion_rate" },
        id: "datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate",
    },
    {
        data: { label: "is_closed" },
        id: "datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed",
    },
    {
        data: { label: "number_application_attempts" },
        id: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
    },
    {
        data: { label: "ref.Firstname_Gender" },
        id: "spark_ref_Firstname_Gender",
    },
    {
        data: { label: "number_successful_applications" },
        id: "datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications",
    },
    {
        data: { label: "conformed_application_business" },
        id: "conformed_application_business",
    },
    {
        data: { label: "term_months_loc_24" },
        id: "datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
    },
    {
        data: { label: "conformed_application_history" },
        id: "conformed_application_history",
    },
    { data: { label: "conformed_promotion" }, id: "conformed_promotion" },
    {
        data: { label: "legal_entity_type" },
        id: "datahub_pipeline_features_account_legal_entity_type_function_legal_entity_type_legal_entity_type",
    },
    {
        data: { label: "partner_sales_channel" },
        id: "datahub_pipeline_features_account_partner_sales_channel_function_partner_sales_channel_partner_sales_channel",
    },
    {
        data: { label: "annual_percentage_rate_mean_imputed" },
        id: "datahub_pipeline_features_contract_annual_percentage_rate_mean_imputed_function_annual_percentage_rate_mean_imputed_annual_percentage_rate_mean_imputed",
    },
    {
        data: { label: "days_active" },
        id: "datahub_pipeline_features_contract_days_active_function_days_active_days_active",
    },
    {
        data: { label: "is_assisted" },
        id: "datahub_pipeline_features_contract_is_assisted_function_is_assisted_is_assisted",
    },
    {
        data: { label: "is_in_arrears" },
        id: "datahub_pipeline_features_contract_is_in_arrears_function_is_in_arrears_is_in_arrears",
    },
    {
        data: { label: "is_loc_suspended" },
        id: "datahub_pipeline_features_contract_is_loc_suspended_function_is_loc_suspended_is_loc_suspended",
    },
    {
        data: { label: "recency_months" },
        id: "datahub_pipeline_features_contract_recency_months_function_recency_months_recency_months",
    },
    {
        data: { label: "term_days_confirmed_or_projected" },
        id: "datahub_pipeline_features_contract_term_days_confirmed_or_projected_function_term_days_confirmed_or_projected_term_days_confirmed_or_projected",
    },
    {
        data: { label: "contact_likely_gender" },
        id: "datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender",
    },
    {
        data: { label: "mean_annual_revenue_by_industry" },
        id: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
    },
    {
        data: { label: "account_state" },
        id: "datahub_pipeline_features_account_account_state_function_account_state_account_state",
    },
    {
        data: { label: "application_success_percentage" },
        id: "datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage",
    },
    {
        data: { label: "business_monthly_sales_by_application" },
        id: "datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application",
    },
    {
        data: { label: "is_churned" },
        id: "datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned",
    },
    {
        data: { label: "loan_term_approved" },
        id: "datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
    },
    {
        data: { label: "term_longer_than_requested_loc_24" },
        id: "datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24",
    },
    {
        data: { label: "time_spent_by_team" },
        id: "datahub_pipeline_features_application_time_spent_by_team_function_time_spent_by_team_time_spent_by_team",
    },
    {
        data: { label: "promotion_indicator" },
        id: "datahub_pipeline_features_promotion_promotion_function_promotion_indicator_promotion_indicator",
    },
    {
        data: { label: "data" },
        id: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        data: { label: "one_hot_encoder" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
    },
    {
        data: { label: "split" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_split_function_split_split",
    },
    {
        data: { label: "pca_scaler" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_scaler_function_pca_scaler_pca_scaler",
    },
    {
        data: {
            label: "datahub.pipeline.model.churn_rate.survival_regressor.prediction.one_hot_encoder.one_hot_encoder",
        },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
    },
    {
        data: { label: "pca_survival_regressor" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_survival_regressor_function_pca_survival_regressor_pca_survival_regressor",
    },
    {
        data: { label: "scale_for_pca" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_scale_for_pca_function_scale_for_pca_scale_for_pca",
    },
    {
        data: { label: "train_survival_regressor" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_train_survival_regressor_function_train_survival_regressor_train_survival_regressor",
    },
    {
        data: { label: "pca" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_pca_function_pca_pca",
    },
    {
        data: { label: "survival_regressor_metrics" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_survival_regressor_metrics_function_survival_regressor_metrics_survival_regressor_metrics",
    },
    {
        data: { label: "predict_survival_regressor" },
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_predict_survival_regressor_function_predict_survival_regressor_predict_survival_regressor",
    },
    {
        data: { label: "graph" },
        id: "datahub_pipeline_model_churn_rate_graph_function_graph_graph",
    },
];

const initialEdges = [
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_survival_regressor_metrics_function_survival_regressor_metrics_survival_regressor_metrics_datahub_pipeline_model_churn_rate_graph_function_graph_graph",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_train_survival_regressor_metrics_function_survival_regressor_metrics_survival_regressor_metrics",
        target: "datahub_pipeline_model_churn_rate_graph_function_graph_graph",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_predict_survival_regressor_function_predict_survival_regressor_predict_survival_regressor_datahub_pipeline_model_churn_rate_graph_function_graph_graph",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_predict_survival_regressor_function_predict_survival_regressor_predict_survival_regressor",
        target: "datahub_pipeline_model_churn_rate_graph_function_graph_graph",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_train_survival_regressor_function_train_survival_regressor_train_survival_regressor_datahub_pipeline_model_churn_rate_survival_regressor_train_survival_regressor_metrics_function_survival_regressor_metrics_survival_regressor_metrics",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_train_train_survival_regressor_function_train_survival_regressor_train_survival_regressor",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_train_survival_regressor_metrics_function_survival_regressor_metrics_survival_regressor_metrics",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_pca_function_pca_pca_datahub_pipeline_model_churn_rate_survival_regressor_prediction_predict_survival_regressor_function_predict_survival_regressor_predict_survival_regressor",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_pca_function_pca_pca",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_predict_survival_regressor_function_predict_survival_regressor_predict_survival_regressor",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_survival_regressor_function_pca_survival_regressor_pca_survival_regressor_datahub_pipeline_model_churn_rate_survival_regressor_train_train_survival_regressor_function_train_survival_regressor_train_survival_regressor",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_survival_regressor_function_pca_survival_regressor_pca_survival_regressor",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_train_train_survival_regressor_function_train_survival_regressor_train_survival_regressor",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_scale_for_pca_function_scale_for_pca_scale_for_pca_datahub_pipeline_model_churn_rate_survival_regressor_prediction_pca_function_pca_pca",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_scale_for_pca_function_scale_for_pca_scale_for_pca",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_pca_function_pca_pca",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_scaler_function_pca_scaler_pca_scaler_datahub_pipeline_model_churn_rate_survival_regressor_train_pca_survival_regressor_function_pca_survival_regressor_pca_survival_regressor",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_scaler_function_pca_scaler_pca_scaler",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_survival_regressor_function_pca_survival_regressor_pca_survival_regressor",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_one_hot_encoder_function_one_hot_encoder_one_hot_encoder_datahub_pipeline_model_churn_rate_survival_regressor_prediction_scale_for_pca_function_scale_for_pca_scale_for_pca",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_scale_for_pca_function_scale_for_pca_scale_for_pca",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_split_function_split_split_datahub_pipeline_model_churn_rate_survival_regressor_train_pca_scaler_function_pca_scaler_pca_scaler",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_train_split_function_split_split",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_train_pca_scaler_function_pca_scaler_pca_scaler",
    },
    {
        id: "datahub_pipeline_model_churn_rate_data_function_data_data_datahub_pipeline_model_churn_rate_survival_regressor_prediction_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
        source: "datahub_pipeline_model_churn_rate_data_function_data_data",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_prediction_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
    },
    {
        id: "datahub_pipeline_model_churn_rate_data_function_data_data_datahub_pipeline_model_churn_rate_survival_regressor_train_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
        source: "datahub_pipeline_model_churn_rate_data_function_data_data",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_train_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
    },
    {
        id: "datahub_pipeline_model_churn_rate_survival_regressor_train_one_hot_encoder_function_one_hot_encoder_one_hot_encoder_datahub_pipeline_model_churn_rate_survival_regressor_train_split_function_split_split",
        source: "datahub_pipeline_model_churn_rate_survival_regressor_train_one_hot_encoder_function_one_hot_encoder_one_hot_encoder",
        target: "datahub_pipeline_model_churn_rate_survival_regressor_train_split_function_split_split",
    },
    {
        id: "standard_spark_raw_salesforce_loan__loan_account__c_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "standard_spark_raw_salesforce_loan__loan_account__c",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "standard_spark_raw_salesforce_loan__loan_account__c_conformed_contract",
        source: "standard_spark_raw_salesforce_loan__loan_account__c",
        target: "conformed_contract",
    },
    {
        id: "standard_spark_raw_salesforce_account_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "standard_spark_raw_salesforce_account",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "standard_spark_raw_salesforce_account_conformed_account",
        source: "standard_spark_raw_salesforce_account",
        target: "conformed_account",
    },
    {
        id: "standard_spark_raw_salesforce_genesis__applications__c_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "standard_spark_raw_salesforce_genesis__applications__c",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "standard_spark_raw_salesforce_genesis__applications__c_conformed_application",
        source: "standard_spark_raw_salesforce_genesis__applications__c",
        target: "conformed_application",
    },
    {
        id: "conformed_product_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "conformed_product",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "conformed_product_datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
        source: "conformed_product",
        target: "datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
    },
    {
        id: "conformed_product_datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
        source: "conformed_product",
        target: "datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
    },
    {
        id: "conformed_product_datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
        source: "conformed_product",
        target: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
    },
    {
        id: "conformed_contact_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "conformed_contact",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "conformed_contact_datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender",
        source: "conformed_contact",
        target: "datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender",
    },
    {
        id: "conformed_industry_classification_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "conformed_industry_classification",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "conformed_industry_classification_datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
        source: "conformed_industry_classification",
        target: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
    },
    {
        id: "datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code_datahub_pipeline_features_account_account_state_function_account_state_account_state",
        source: "datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code",
        target: "datahub_pipeline_features_account_account_state_function_account_state_account_state",
    },
    {
        id: "datahub_pipeline_features_account_legal_entity_type_function_legal_entity_type_legal_entity_type_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_account_legal_entity_type_function_legal_entity_type_legal_entity_type",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_account_partner_sales_channel_function_partner_sales_channel_partner_sales_channel_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_account_partner_sales_channel_function_partner_sales_channel_partner_sales_channel",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_annual_percentage_rate_mean_imputed_function_annual_percentage_rate_mean_imputed_annual_percentage_rate_mean_imputed_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_annual_percentage_rate_mean_imputed_function_annual_percentage_rate_mean_imputed_annual_percentage_rate_mean_imputed",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate_datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned",
        source: "datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate",
        target: "datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned",
    },
    {
        id: "datahub_pipeline_features_contract_days_active_function_days_active_days_active_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_days_active_function_days_active_days_active",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_is_assisted_function_is_assisted_is_assisted_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_is_assisted_function_is_assisted_is_assisted",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_is_in_arrears_function_is_in_arrears_is_in_arrears_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_is_in_arrears_function_is_in_arrears_is_in_arrears",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed_datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned",
        source: "datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed",
        target: "datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned",
    },
    {
        id: "datahub_pipeline_features_contract_is_loc_suspended_function_is_loc_suspended_is_loc_suspended_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_is_loc_suspended_function_is_loc_suspended_is_loc_suspended",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_recency_months_function_recency_months_recency_months_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_recency_months_function_recency_months_recency_months",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_term_days_confirmed_or_projected_function_term_days_confirmed_or_projected_term_days_confirmed_or_projected_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_term_days_confirmed_or_projected_function_term_days_confirmed_or_projected_term_days_confirmed_or_projected",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_account_account_state_function_account_state_account_state_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_account_account_state_function_account_state_account_state",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_is_churned_function_is_churned_is_churned",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts_datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage",
        source: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
        target: "datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage",
    },
    {
        id: "datahub_pipeline_features_application_time_spent_by_team_function_time_spent_by_team_time_spent_by_team_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_application_time_spent_by_team_function_time_spent_by_team_time_spent_by_team",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "datahub_pipeline_features_promotion_promotion_function_promotion_indicator_promotion_indicator_datahub_pipeline_model_churn_rate_data_function_data_data",
        source: "datahub_pipeline_features_promotion_promotion_function_promotion_indicator_promotion_indicator",
        target: "datahub_pipeline_model_churn_rate_data_function_data_data",
    },
    {
        id: "spark_raw_salesforce_loan__loan_account__c_rename_spark_raw_salesforce_loan__loan_account__c",
        source: "spark_raw_salesforce_loan__loan_account__c",
        target: "rename_spark_raw_salesforce_loan__loan_account__c",
    },
    {
        id: "spark_raw_salesforce_account_rename_spark_raw_salesforce_account",
        source: "spark_raw_salesforce_account",
        target: "rename_spark_raw_salesforce_account",
    },
    {
        id: "spark_raw_salesforce_genesis__applications__c_rename_spark_raw_salesforce_genesis__applications__c",
        source: "spark_raw_salesforce_genesis__applications__c",
        target: "rename_spark_raw_salesforce_genesis__applications__c",
    },
    {
        id: "standard_spark_raw_salesforce_loan__loan_product__c_conformed_product",
        source: "standard_spark_raw_salesforce_loan__loan_product__c",
        target: "conformed_product",
    },
    {
        id: "standard_spark_raw_salesforce_contact_conformed_contact",
        source: "standard_spark_raw_salesforce_contact",
        target: "conformed_contact",
    },
    {
        id: "standard_spark_ref_Industry_Classification_conformed_industry_classification",
        source: "standard_spark_ref_Industry_Classification",
        target: "conformed_industry_classification",
    },
    {
        id: "conformed_account_datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code",
        source: "conformed_account",
        target: "datahub_pipeline_features_account_account_country_code_function_account_country_code_account_country_code",
    },
    {
        id: "conformed_account_datahub_pipeline_features_account_legal_entity_type_function_legal_entity_type_legal_entity_type",
        source: "conformed_account",
        target: "datahub_pipeline_features_account_legal_entity_type_function_legal_entity_type_legal_entity_type",
    },
    {
        id: "conformed_account_datahub_pipeline_features_account_partner_sales_channel_function_partner_sales_channel_partner_sales_channel",
        source: "conformed_account",
        target: "datahub_pipeline_features_account_partner_sales_channel_function_partner_sales_channel_partner_sales_channel",
    },
    {
        id: "conformed_account_datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
        source: "conformed_account",
        target: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
    },
    {
        id: "conformed_account_datahub_pipeline_features_account_account_state_function_account_state_account_state",
        source: "conformed_account",
        target: "datahub_pipeline_features_account_account_state_function_account_state_account_state",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_annual_percentage_rate_mean_imputed_function_annual_percentage_rate_mean_imputed_annual_percentage_rate_mean_imputed",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_annual_percentage_rate_mean_imputed_function_annual_percentage_rate_mean_imputed_annual_percentage_rate_mean_imputed",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_completion_rate_function_completion_rate_completion_rate",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_days_active_function_days_active_days_active",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_days_active_function_days_active_days_active",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_is_assisted_function_is_assisted_is_assisted",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_is_assisted_function_is_assisted_is_assisted",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_is_in_arrears_function_is_in_arrears_is_in_arrears",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_is_in_arrears_function_is_in_arrears_is_in_arrears",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_is_closed_function_is_closed_is_closed",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_is_loc_suspended_function_is_loc_suspended_is_loc_suspended",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_is_loc_suspended_function_is_loc_suspended_is_loc_suspended",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_recency_months_function_recency_months_recency_months",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_recency_months_function_recency_months_recency_months",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_term_days_confirmed_or_projected_function_term_days_confirmed_or_projected_term_days_confirmed_or_projected",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_term_days_confirmed_or_projected_function_term_days_confirmed_or_projected_term_days_confirmed_or_projected",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
        source: "conformed_contract",
        target: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
        source: "conformed_contract",
        target: "datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
    },
    {
        id: "conformed_contract_datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
        source: "conformed_contract",
        target: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
    },
    {
        id: "spark_ref_Firstname_Gender_datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender",
        source: "spark_ref_Firstname_Gender",
        target: "datahub_pipeline_features_contact_contact_likely_gender_function_contact_likely_gender_contact_likely_gender",
    },
    {
        id: "conformed_application_datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
        source: "conformed_application",
        target: "datahub_pipeline_features_account_mean_annual_revenue_by_industry_function_mean_annual_revenue_by_industry_mean_annual_revenue_by_industry",
    },
    {
        id: "conformed_application_datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application",
        source: "conformed_application",
        target: "datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application",
    },
    {
        id: "conformed_application_datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
        source: "conformed_application",
        target: "datahub_pipeline_features_contract_loan_term_approved_function_loan_term_approved_loan_term_approved",
    },
    {
        id: "conformed_application_datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24",
        source: "conformed_application",
        target: "datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24",
    },
    {
        id: "conformed_application_datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
        source: "conformed_application",
        target: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
    },
    {
        id: "conformed_application_datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications",
        source: "conformed_application",
        target: "datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications",
    },
    {
        id: "conformed_application_datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
        source: "conformed_application",
        target: "datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
    },
    {
        id: "conformed_application_datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
        source: "conformed_application",
        target: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
    },
    {
        id: "datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications_datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage",
        source: "datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications",
        target: "datahub_pipeline_features_application_application_success_percentage_function_application_success_percentage_application_success_percentage",
    },
    {
        id: "conformed_application_business_datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application",
        source: "conformed_application_business",
        target: "datahub_pipeline_features_application_business_monthly_sales_by_application_function_business_monthly_sales_by_application_business_monthly_sales_by_application",
    },
    {
        id: "datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24_datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24",
        source: "datahub_pipeline_features_contract_term_months_loc_24_function_term_months_loc_24_term_months_loc_24",
        target: "datahub_pipeline_features_contract_term_longer_than_requested_loc_24_function_term_longer_than_requested_loc_24_term_longer_than_requested_loc_24",
    },
    {
        id: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled_datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
        source: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
        target: "datahub_pipeline_features_application_number_application_attempts_function_number_application_attempts_number_application_attempts",
    },
    {
        id: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled_datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications",
        source: "datahub_pipeline_features_application_application_was_settled_function_application_was_settled_application_was_settled",
        target: "datahub_pipeline_features_application_number_successful_applications_function_number_successful_applications_number_successful_applications",
    },
    {
        id: "conformed_application_history_datahub_pipeline_features_application_time_spent_by_team_function_time_spent_by_team_time_spent_by_team",
        source: "conformed_application_history",
        target: "datahub_pipeline_features_application_time_spent_by_team_function_time_spent_by_team_time_spent_by_team",
    },
    {
        id: "conformed_promotion_datahub_pipeline_features_promotion_promotion_function_promotion_indicator_promotion_indicator",
        source: "conformed_promotion",
        target: "datahub_pipeline_features_promotion_promotion_function_promotion_indicator_promotion_indicator",
    },
    {
        id: "spark_raw_salesforce_loan__loan_product__c_rename_spark_raw_salesforce_loan__loan_product__c",
        source: "spark_raw_salesforce_loan__loan_product__c",
        target: "rename_spark_raw_salesforce_loan__loan_product__c",
    },
    {
        id: "spark_raw_salesforce_contact_rename_spark_raw_salesforce_contact",
        source: "spark_raw_salesforce_contact",
        target: "rename_spark_raw_salesforce_contact",
    },
    {
        id: "spark_ref_Industry_Classification_rename_spark_ref_Industry_Classification",
        source: "spark_ref_Industry_Classification",
        target: "rename_spark_ref_Industry_Classification",
    },
    {
        id: "standard_spark_curated_lms_loanaccount_conformed_contract",
        source: "standard_spark_curated_lms_loanaccount",
        target: "conformed_contract",
    },
    {
        id: "standard_spark_curated_lms_loanaccount_conformed_application",
        source: "standard_spark_curated_lms_loanaccount",
        target: "conformed_application",
    },
    {
        id: "standard_spark_raw_salesforce_genesis__application_business_information__c_conformed_application_business",
        source: "standard_spark_raw_salesforce_genesis__application_business_information__c",
        target: "conformed_application_business",
    },
    {
        id: "standard_spark_raw_salesforce_genesis__applications__history_conformed_application_history",
        source: "standard_spark_raw_salesforce_genesis__applications__history",
        target: "conformed_application_history",
    },
    {
        id: "standard_spark_raw_salesforce_promotion__c_conformed_promotion",
        source: "standard_spark_raw_salesforce_promotion__c",
        target: "conformed_promotion",
    },
    {
        id: "spark_curated_lms_loanaccount_rename_spark_curated_lms_loanaccount",
        source: "spark_curated_lms_loanaccount",
        target: "rename_spark_curated_lms_loanaccount",
    },
    {
        id: "spark_raw_salesforce_genesis__application_business_information__c_rename_spark_raw_salesforce_genesis__application_business_information__c",
        source: "spark_raw_salesforce_genesis__application_business_information__c",
        target: "rename_spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        id: "spark_raw_salesforce_genesis__applications__history_rename_spark_raw_salesforce_genesis__applications__history",
        source: "spark_raw_salesforce_genesis__applications__history",
        target: "rename_spark_raw_salesforce_genesis__applications__history",
    },
    {
        id: "spark_raw_salesforce_promotion__c_rename_spark_raw_salesforce_promotion__c",
        source: "spark_raw_salesforce_promotion__c",
        target: "rename_spark_raw_salesforce_promotion__c",
    },
    {
        id: "rename_spark_raw_salesforce_loan__loan_product__c_transform_spark_raw_salesforce_loan__loan_product__c",
        source: "rename_spark_raw_salesforce_loan__loan_product__c",
        target: "transform_spark_raw_salesforce_loan__loan_product__c",
    },
    {
        id: "transform_spark_raw_salesforce_loan__loan_product__c_standard_spark_raw_salesforce_loan__loan_product__c",
        source: "transform_spark_raw_salesforce_loan__loan_product__c",
        target: "standard_spark_raw_salesforce_loan__loan_product__c",
    },
    {
        id: "rename_spark_raw_salesforce_contact_transform_spark_raw_salesforce_contact",
        source: "rename_spark_raw_salesforce_contact",
        target: "transform_spark_raw_salesforce_contact",
    },
    {
        id: "transform_spark_raw_salesforce_contact_standard_spark_raw_salesforce_contact",
        source: "transform_spark_raw_salesforce_contact",
        target: "standard_spark_raw_salesforce_contact",
    },
    {
        id: "rename_spark_ref_Industry_Classification_transform_spark_ref_Industry_Classification",
        source: "rename_spark_ref_Industry_Classification",
        target: "transform_spark_ref_Industry_Classification",
    },
    {
        id: "transform_spark_ref_Industry_Classification_standard_spark_ref_Industry_Classification",
        source: "transform_spark_ref_Industry_Classification",
        target: "standard_spark_ref_Industry_Classification",
    },
    {
        id: "rename_spark_raw_salesforce_account_transform_spark_raw_salesforce_account",
        source: "rename_spark_raw_salesforce_account",
        target: "transform_spark_raw_salesforce_account",
    },
    {
        id: "transform_spark_raw_salesforce_account_standard_spark_raw_salesforce_account",
        source: "transform_spark_raw_salesforce_account",
        target: "standard_spark_raw_salesforce_account",
    },
    {
        id: "rename_spark_raw_salesforce_loan__loan_account__c_transform_spark_raw_salesforce_loan__loan_account__c",
        source: "rename_spark_raw_salesforce_loan__loan_account__c",
        target: "transform_spark_raw_salesforce_loan__loan_account__c",
    },
    {
        id: "transform_spark_raw_salesforce_loan__loan_account__c_standard_spark_raw_salesforce_loan__loan_account__c",
        source: "transform_spark_raw_salesforce_loan__loan_account__c",
        target: "standard_spark_raw_salesforce_loan__loan_account__c",
    },
    {
        id: "rename_spark_raw_salesforce_genesis__applications__c_transform_spark_raw_salesforce_genesis__applications__c",
        source: "rename_spark_raw_salesforce_genesis__applications__c",
        target: "transform_spark_raw_salesforce_genesis__applications__c",
    },
    {
        id: "transform_spark_raw_salesforce_genesis__applications__c_standard_spark_raw_salesforce_genesis__applications__c",
        source: "transform_spark_raw_salesforce_genesis__applications__c",
        target: "standard_spark_raw_salesforce_genesis__applications__c",
    },
    {
        id: "rename_spark_curated_lms_loanaccount_transform_spark_curated_lms_loanaccount",
        source: "rename_spark_curated_lms_loanaccount",
        target: "transform_spark_curated_lms_loanaccount",
    },
    {
        id: "transform_spark_curated_lms_loanaccount_standard_spark_curated_lms_loanaccount",
        source: "transform_spark_curated_lms_loanaccount",
        target: "standard_spark_curated_lms_loanaccount",
    },
    {
        id: "rename_spark_raw_salesforce_genesis__application_business_information__c_transform_spark_raw_salesforce_genesis__application_business_information__c",
        source: "rename_spark_raw_salesforce_genesis__application_business_information__c",
        target: "transform_spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        id: "transform_spark_raw_salesforce_genesis__application_business_information__c_standard_spark_raw_salesforce_genesis__application_business_information__c",
        source: "transform_spark_raw_salesforce_genesis__application_business_information__c",
        target: "standard_spark_raw_salesforce_genesis__application_business_information__c",
    },
    {
        id: "rename_spark_raw_salesforce_genesis__applications__history_transform_spark_raw_salesforce_genesis__applications__history",
        source: "rename_spark_raw_salesforce_genesis__applications__history",
        target: "transform_spark_raw_salesforce_genesis__applications__history",
    },
    {
        id: "transform_spark_raw_salesforce_genesis__applications__history_standard_spark_raw_salesforce_genesis__applications__history",
        source: "transform_spark_raw_salesforce_genesis__applications__history",
        target: "standard_spark_raw_salesforce_genesis__applications__history",
    },
    {
        id: "rename_spark_raw_salesforce_promotion__c_transform_spark_raw_salesforce_promotion__c",
        source: "rename_spark_raw_salesforce_promotion__c",
        target: "transform_spark_raw_salesforce_promotion__c",
    },
    {
        id: "transform_spark_raw_salesforce_promotion__c_standard_spark_raw_salesforce_promotion__c",
        source: "transform_spark_raw_salesforce_promotion__c",
        target: "standard_spark_raw_salesforce_promotion__c",
    },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? "left" : "top";
        node.sourcePosition = isHorizontal ? "right" : "bottom";

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
);

const LayoutFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    {
                        ...params,
                        type: ConnectionLineType.Straight,
                        animated: false,
                    },
                    eds
                )
            ),
        []
    );
    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } =
                getLayoutedElements(nodes, edges, direction);

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges]
    );

    return (
        <div className="layoutflow">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.Straight}
                fitView
            />
            <div className="controls">
                <button onClick={() => onLayout("TB")}>vertical layout</button>
                <button onClick={() => onLayout("LR")}>
                    horizontal layout
                </button>
            </div>
        </div>
    );
};

export default LayoutFlow;
