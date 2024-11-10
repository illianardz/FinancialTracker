import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';

export default function CustomPlan() {
    // State for page navigation and loading state
    const [currentPage, setCurrentPage] = useState('incomeExpenses');
    const [loading, setLoading] = useState(false);

    // States for Income and Expenses
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

    // States for Savings and Investments
    const [totalSavings, setTotalSavings] = useState('');
    const [retirementAccounts, setRetirementAccounts] = useState('');
    const [stocksAndBonds, setStocksAndBonds] = useState('');
    const [mutualFunds, setMutualFunds] = useState('');
    const [shortTermGoals, setShortTermGoals] = useState('');
    const [longTermGoals, setLongTermGoals] = useState('');
    const [financialLossTolerance, setFinancialLossTolerance] = useState('');
    const [safetyNet, setSafetyNet] = useState('');

    const handleNextPage = (page) => setCurrentPage(page);

    const handleGeneratePlan = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCurrentPage('financialHealthSummary');
        }, 2000);
    };

    const LoadingView = () => (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.title}>Generating Plan...</Text>
            <Text style={styles.subtitle}>
                Did you know?
                Financial experts recommend having an emergency fund that covers at least three to six months of living expenses to protect against unforeseen financial hardships.
            </Text>
        </View>
    );

    const formatPercentage = (value) => {
        // Check if the value is empty, undefined, or zero
        const numValue = Number(value);
        return numValue === 0 ? "Not Applicable" : `${((numValue / totalExpenses) * 100).toFixed(2)}%`;
    };

    const FinancialHealthSummaryView = () => {
        const totalExpenses = Number(housing) + Number(utilities) + Number(food) + Number(transportation) +
                              Number(insurance) + Number(entertainment) + Number(debtPayments) +
                              Number(savingsInvestments) + Number(otherExpenses);

        return (
            <View style={styles.centered}>
                <Text style={styles.title}>FINANCIAL HEALTH SUMMARY</Text>
                <Text>Total Income (monthly): {Number(salary) + Number(additionalIncome)}</Text>
                <Text>Expenses (monthly): {totalExpenses}</Text>
                <Text>Net Savings (monthly): {(Number(salary) + Number(additionalIncome)) - totalExpenses}</Text>
                <Text>Investment Balance: {Number(totalSavings) + Number(retirementAccounts) + Number(stocksAndBonds) + Number(mutualFunds)}</Text>

                <Text style={styles.title}>BUDGET BREAKDOWN</Text>
                <Text>Housing: {formatPercentage(housing)}</Text>
                <Text>Utilities: {formatPercentage(utilities)}</Text>
                <Text>Food: {formatPercentage(food)}</Text>
                <Text>Transportation: {formatPercentage(transportation)}</Text>
                <Text>Insurance: {formatPercentage(insurance)}</Text>
                <Text>Entertainment: {formatPercentage(entertainment)}</Text>
                <Text>Debt Payments: {formatPercentage(debtPayments)}</Text>
                <Text>Savings/Investments: {formatPercentage(savingsInvestments)}</Text>
                <Text>Other Expenses: {formatPercentage(otherExpenses)}</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>SAVE PLAN</Text>
                </TouchableOpacity>
            </View>
        );
    };
  
    const IncomeExpensesView = () => (
        <>
            <Text style={styles.title}>Enter Monthly Income:</Text>
            {[['Salary', salary, setSalary], ['Additional Income', additionalIncome, setAdditionalIncome]].map(([label, value, setValue], index) => (
                <View style={styles.inputContainer} key={index}>
                    <Text style={styles.label}>{label}:</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={value} onChangeText={setValue} />
                </View>
            ))}
            <Text style={styles.title}>Enter Monthly Expenses:</Text>
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
            ].map(([label, value, setValue], index) => (
                <View style={styles.inputContainer} key={index}>
                    <Text style={styles.label}>{label}:</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={value} onChangeText={setValue} />
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => handleNextPage('savingsInvestments')}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </>
    );

    const SavingsInvestmentsView = () => (
    <>
        <Text style={styles.title}>Savings and Investments:</Text>
        {[
            ['Total Savings', totalSavings, setTotalSavings],
            ['Retirement Accounts', retirementAccounts, setRetirementAccounts],
            ['Stocks and Bonds', stocksAndBonds, setStocksAndBonds],
            ['Mutual Funds', mutualFunds, setMutualFunds]
        ].map(([label, value, setValue], index) => (
            <View style={styles.inputContainer} key={index}>
                <Text style={styles.label}>{label}:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={value} onChangeText={setValue} />
            </View>
        ))}
        <Text style={styles.title}>Savings Goals:</Text>
        {[
            ['Short-Term', shortTermGoals, setShortTermGoals],
            ['Long-Term', longTermGoals, setLongTermGoals]
        ].map(([label, value, setValue], index) => (
            <View style={styles.inputContainer} key={index}>
                <Text style={styles.label}>{label}:</Text> {/* Ensure this line is corrected */}
                <TextInput style={styles.input} keyboardType="numeric" value={value} onChangeText={setValue} />
            </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => handleNextPage('financialPlanReview')}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNextPage('incomeExpenses')}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
    </>
);

    const FinancialPlanReviewView = () => (
        <>
            <Text style={styles.title}>Financial Plan Review</Text>
            <Text style={styles.subtitle}>INCOME SUMMARY</Text>
            <Text>Salary: {salary}</Text>
            <Text>Additional Income: {additionalIncome}</Text>

            <Text style={styles.subtitle}>EXPENSES SUMMARY</Text>
            <Text>Housing: {housing}</Text>
            <Text>Utilities: {utilities}</Text>
            <Text>Food: {food}</Text>
            <Text>Transportation: {transportation}</Text>
            <Text>Insurance: {insurance}</Text>
            <Text>Entertainment: {entertainment}</Text>
            <Text>Debt Payments: {debtPayments}</Text>
            <Text>Savings/Investments: {savingsInvestments}</Text>
            <Text>Other Expenses: {otherExpenses}</Text>

            <Text style={styles.subtitle}>SAVINGS/INVESTMENT SUMMARY</Text>
            <Text>Total Savings: {totalSavings}</Text>
            <Text>Retirement Accounts: {retirementAccounts}</Text>
            <Text>Stocks and Bonds: {stocksAndBonds}</Text>
            <Text>Mutual Funds: {mutualFunds}</Text>
            <Text>Short-Term Goals: {shortTermGoals}</Text>
            <Text>Long-Term Goals: {longTermGoals}</Text>
            <Text>Financial Loss Tolerance: {financialLossTolerance}</Text>
            <Text>Safety Net: {safetyNet}</Text>

            <TouchableOpacity style={styles.button} onPress={handleGeneratePlan}>
                <Text style={styles.buttonText}>GENERATE PLAN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNextPage('savingsInvestments')}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <ScrollView style={styles.container}>
            {loading ? <LoadingView /> :
             currentPage === 'incomeExpenses' ? <IncomeExpensesView /> :
             currentPage === 'savingsInvestments' ? <SavingsInvestmentsView /> :
             currentPage === 'financialPlanReview' ? <FinancialPlanReviewView /> :
             <FinancialHealthSummaryView />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        width: 150,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


