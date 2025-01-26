import pandas as pd
import numpy as np

def find_drug_conflict(drug1, drug2):
    """
    Find conflicts between two drugs.

    Parameters:
        drug1 (str): Name of the first drug.
        drug2 (str): Name of the second drug.

    Returns:
        dict or None: Conflict details if found, otherwise None.
    """
    # Predefined dataset of drug conflicts
    dataset = pd.read_csv('drug_conflict_dataset.csv')
    
    # Search for a conflict
    # for conflict in dataset:
    #     if (conflict["Drug A Name"].lower() == drug1.lower() and conflict["Drug B Name"].lower() == drug2.lower()) or \
    #        (conflict["Drug A Name"].lower() == drug2.lower() and conflict["Drug B Name"].lower() == drug1.lower()):
    #         return conflict

    for _, row in dataset.iterrows():
        if (row["Drug A Name"].strip().lower() == drug1.strip().lower() and row["Drug B Name"].strip().lower() == drug2.strip().lower()) or \
           (row["Drug A Name"].strip().lower() == drug2.strip().lower() and row["Drug B Name"].strip().lower() == drug1.strip().lower()):
            return row.to_dict()
    
    # Return None if no conflict is found
    return None


print(find_drug_conflict(input('Enter drug A : '),input('Enter drug B : ')))  # Example usage
