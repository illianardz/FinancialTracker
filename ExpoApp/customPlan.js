import React, { useState } from 'react'; 
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Modal, ActivityIndicator, Alert
} from 'react-native';
import styles from './styles';

export default function CustomPlan() {
    const [currentPage, setCurrentPage] = useState('incomeExpenses');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [savingsModalVisible, setSavingsModalVisible] = useState(false);
    
    const [salary, setSalary] = useState('');
    const [additionalIncome, setAdditionalIncome] = useState('');
    const [housing, setHousing] = useState('');
    const [utilities, setUtilities] = useState('');
    const [food, setFood] = useState('');
    const [transportation, setTransportation] = useState('');
    const [insurance, setInsurance] = useState('');
    const [entertainment, setEntertainment] = useState('');
    const [debtPayments, setDebtPayments] = useState('');
    const [savingsInvestments, setSavingsInvestments] = useState('');
    const [otherExpenses, setOtherExpenses] = useState('');

    const [totalSavings, setTotalSavings] = useState('');
    const [retirementAccounts, setRetirementAccounts] = useState('');
    const [stocksAndBonds, setStocksAndBonds] = useState('');
    const [mutualFunds, setMutualFunds] = useState('');

    const allFields = [
        salary, additionalIncome, housing, utilities, food, transportation,
        insurance, entertainment, debtPayments, savingsInvestments, otherExpenses,
    ];

    const investmentFields = [
        totalSavings, retirementAccounts, stocksAndBonds, mutualFunds,
    ];

    const isValidInput = (input) => input.trim() !== '';

    const handleNextPage = (page, validationFields) => {
        if (validationFields.every(isValidInput)) {
            setCurrentPage(page);
        } else {
            Alert.alert("Incomplete Input", "Please fill in all fields before proceeding.");
        }
    };

    const nextPage = (page) => {
        setCurrentPage(page);
    };

    const handleGeneratePlan = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCurrentPage('financialHealthSummary');
        }, 2000);
    };

    const LoadingView = () => (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#B098A4" />
            <Text style={styles.planTitle}>Generating Plan...</Text>
            <Text style={styles.subtitle}>
                Did you know?
                Financial experts recommend having an emergency fund that covers at least three to six months of living expenses to protect against unforeseen financial hardships.
            </Text>
        </View>
    );

    const formatPercentage = (value, total) => {
        const numValue = Number(value);
        if (total === 0) return "0%";  // Return 0% if total expenses are zero to avoid division by zero
        return `${((numValue / total) * 100).toFixed(2)}%`;
    };

    const FinancialHealthSummaryView = () => {
        const totalExpenses = Number(housing) + Number(utilities) + Number(food) + Number(transportation) +
                              Number(insurance) + Number(entertainment) + Number(debtPayments) +
                              Number(savingsInvestments) + Number(otherExpenses);

        return (
            <View style={styles.centered}>
                <Text style={styles.planTitle}>FINANCIAL HEALTH SUMMARY</Text>
                <Text style={styles.planLabel}>Total Income (monthly): {Number(salary) + Number(additionalIncome)}</Text>
                <Text style={styles.planLabel}>Expenses (monthly): {totalExpenses}</Text>
                <Text style={styles.planLabel}>Net Savings (monthly): {(Number(salary) + Number(additionalIncome)) - totalExpenses}</Text>
                <Text style={styles.planLabel}>Investment Balance: {Number(totalSavings) + Number(retirementAccounts) + Number(stocksAndBonds) + Number(mutualFunds)}</Text>

                <Text style={styles.planTitle}>BUDGET BREAKDOWN</Text>
                <Text style={styles.planLabel}>Housing: {formatPercentage(housing, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Utilities: {formatPercentage(utilities, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Food: {formatPercentage(food, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Transportation: {formatPercentage(transportation, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Insurance: {formatPercentage(insurance, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Entertainment: {formatPercentage(entertainment, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Debt Payments: {formatPercentage(debtPayments, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Savings/Investments: {formatPercentage(savingsInvestments, totalExpenses)}</Text>
                <Text style={styles.planLabel}>Other Expenses: {formatPercentage(otherExpenses, totalExpenses)}</Text>
            </View>
        );
    };

    const InfoModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Income and Expenses</Text>
                    <Text style={styles.modalSubtitle}>Income:</Text>
                    <Text style={styles.modalText}>
                        The total money you receive from various sources such as wages, business profits, investment returns, and other earnings.
                        It represents your financial inflow.
                    </Text>
                    <Text style={styles.modalSubtitle}>Expenses:</Text>
                    <Text style={styles.modalText}>
                        All the costs incurred in earning income and maintaining a standard of living or business operations.
                        This includes rent, utilities, supplies, and other necessary payments. Expenses represent your financial outflow.
                    </Text>
                    <TouchableOpacity
                        style={[styles.planButton, styles.planButtonClose]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.planButtonClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const SavingsInfoModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={savingsModalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setSavingsModalVisible(!savingsModalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>About Savings and Investments</Text>
                    <Text style={styles.modalSubtitle}>Total Savings:</Text>
                    <Text style={styles.modalText}>
                        The sum of all money saved across different accounts and liquid assets that can be accessed easily.
                    </Text>
                    <Text style={styles.modalSubtitle}>Retirement Accounts:</Text>
                    <Text style={styles.modalText}>
                        Specialized accounts for saving for retirement that offer tax advantages. Common types include 401(k)s and IRAs.
                    </Text>
                    <Text style={styles.modalSubtitle}>Stocks:</Text>
                    <Text style={styles.modalText}>
                        Equity investments that represent ownership in a company, with potential for high returns but higher risk.
                    </Text>
                    <Text style={styles.modalSubtitle}>Bonds:</Text>
                    <Text style={styles.modalText}>
                        Loans from investors to borrowers like governments or corporations, offering lower risk but also lower returns compared to stocks.
                    </Text>
                    <Text style={styles.modalSubtitle}>Mutual Funds:</Text>
                    <Text style={styles.modalText}>
                        Investment vehicles that pool money from many investors to purchase a diversified portfolio of securities, managed by professionals.
                        They offer diversification with less risk than individual stocks or bonds.
                    </Text>
                    <TouchableOpacity
                        style={[styles.planButton, styles.planButtonClose]}
                        onPress={() => setSavingsModalVisible(false)}
                    >
                        <Text style={styles.planButtonClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        );

        const IncomeExpensesView = () => (
            <>
                <InfoModal />
                <Text style={styles.planTitle}>Enter Monthly Income:</Text>
                {[
                    ['Salary', salary, setSalary], 
                    ['Additional Income', additionalIncome, setAdditionalIncome]
                ].map(([planLabel, value, setValue], index) => (
                    <View style={styles.planInputContainer} key={index}>
                        <Text style={styles.planLabel}>{planLabel}:</Text>
                        <TextInput
                            style={[styles.planInput, !isValidInput(value) && styles.errorInput]}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text => setValue(text.replace(/[^0-9]/g, ''))}
                            onBlur={() => {
                                if (!isValidInput(value)) {
                                    Alert.alert("Invalid Input", "Please enter a valid numeric value.");
                                }
                            }}
                        />
                    </View>
                ))}
                <Text style={styles.planTitle}>Enter Monthly Expenses:</Text>
                {[
                    ['Housing', housing, setHousing],
                    ['Utilities', utilities, setUtilities],
                    ['Food', food, setFood],
                    ['Transportation', transportation, setTransportation],
                    ['Insurance', insurance, setInsurance],
                    ['Entertainment', entertainment, setEntertainment],
                    ['Debt Payments', debtPayments, setDebtPayments],
                    ['Savings/Investments', savingsInvestments, setSavingsInvestments],
                    ['Other Expenses', otherExpenses, setOtherExpenses]
                ].map(([planLabel, value, setValue], index) => (
                    <View style={styles.planInputContainer} key={index}>
                        <Text style={styles.planLabel}>{planLabel}:</Text>
                        <TextInput
                            style={[styles.planInput, !isValidInput(value) && styles.errorInput]}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text => setValue(text.replace(/[^0-9]/g, ''))}
                            onBlur={() => {
                                if (!isValidInput(value)) {
                                    Alert.alert("Invalid Input", "Please enter a valid numeric value.");
                                }
                            }}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.planButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.planButtonText}>Learn More</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.planButton, { opacity: allFields.every(isValidInput) ? 1 : 0.5 }]}
                    onPress={() => handleNextPage('savingsInvestments', allFields)}
                    disabled={!allFields.every(isValidInput)}
                >
                    <Text style={styles.planButtonText}>Next</Text>
                </TouchableOpacity>
            </>
        );
    
        const SavingsInvestmentsView = () => (
            <>
                <SavingsInfoModal />
                <Text style={styles.planTitle}>Savings and Investments:</Text>
                {[
                    ['Total Savings', totalSavings, setTotalSavings],
                    ['Retirement Accounts', retirementAccounts, setRetirementAccounts],
                    ['Stocks and Bonds', stocksAndBonds, setStocksAndBonds],
                    ['Mutual Funds', mutualFunds, setMutualFunds]
                ].map(([planLabel, value, setValue], index) => (
                    <View style={styles.planInputContainer} key={index}>
                        <Text style={styles.planLabel}>{planLabel}:</Text>
                        <TextInput
                            style={[styles.planInput, !isValidInput(value) && styles.errorInput]}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text => setValue(text.replace(/[^0-9]/g, ''))}
                            onBlur={() => {
                                if (!isValidInput(value)) {
                                    Alert.alert("Invalid Input", "Please enter a valid numeric value.");
                                }
                            }}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.planButton} onPress={() => setSavingsModalVisible(true)}>
                    <Text style={styles.planButtonText}>Learn More</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.planButton, { opacity: investmentFields.every(isValidInput) ? 1 : 0.5 }]}
                    onPress={() => handleNextPage('financialPlanReview', investmentFields)}
                    disabled={!investmentFields.every(isValidInput)}
                >
                    <Text style={styles.planButtonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.planButton} onPress={() => nextPage('incomeExpenses')}>
                    <Text style={styles.planButtonText}>Back</Text>
                </TouchableOpacity>
            </>
        );
    
        const FinancialPlanReviewView = () => (
            <>
                <Text style={styles.planTitle}>Financial Plan Review</Text>
                <Text style={styles.subtitle}>INCOME SUMMARY</Text>
                <Text style={styles.planLabel}>Salary: {salary}</Text>
                <Text style={styles.planLabel}>Additional Income: {additionalIncome}</Text>
    
                <Text style={styles.subtitle}>EXPENSES SUMMARY</Text>
                <Text style={styles.planLabel}>Housing: {housing}</Text>
                <Text style={styles.planLabel}>Utilities: {utilities}</Text>
                <Text style={styles.planLabel}>Food: {food}</Text>
                <Text style={styles.planLabel}>Transportation: {transportation}</Text>
                <Text style={styles.planLabel}>Insurance: {insurance}</Text>
                <Text style={styles.planLabel}>Entertainment: {entertainment}</Text>
                <Text style={styles.planLabel}>Debt Payments: {debtPayments}</Text>
                <Text style={styles.planLabel}>Savings/Investments: {savingsInvestments}</Text>
                <Text style={styles.planLabel}>Other Expenses: {otherExpenses}</Text>
    
                <Text style={styles.subtitle}>SAVINGS/INVESTMENT SUMMARY</Text>
                <Text style={styles.planLabel}>Total Savings: {totalSavings}</Text>
                <Text style={styles.planLabel}>Retirement Accounts: {retirementAccounts}</Text>
                <Text style={styles.planLabel}>Stocks and Bonds: {stocksAndBonds}</Text>
                <Text style={styles.planLabel}>Mutual Funds: {mutualFunds}</Text>
    
                <TouchableOpacity style={styles.planButton} onPress={handleGeneratePlan}>
                    <Text style={styles.planButtonText}>Generate Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.planButton} onPress={() => nextPage('savingsInvestments')}>
                    <Text style={styles.planButtonText}>Back</Text>
                </TouchableOpacity>
            </>
        );
    
    return (
        <ScrollView style={styles.planContainer} keyboardShouldPersistTaps='handled'>
            {loading ? <LoadingView /> :
             currentPage === 'incomeExpenses' ? <IncomeExpensesView /> :
             currentPage === 'savingsInvestments' ? <SavingsInvestmentsView /> :
             currentPage === 'financialPlanReview' ? <FinancialPlanReviewView /> :
             <FinancialHealthSummaryView />}
        </ScrollView>
    );        
}