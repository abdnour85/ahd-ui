import { MissionServiceContract } from "../models/MissionServiceContract";
import { ContractAdditionPayDist, ContractDeductionPayDist, createContractAdditionPayDist, createContractDeductionPayDist, createContractPayDist, createGroupedPayDest, PayDest } from "../models/PaymentDistribution";

/**
 * Populates the groupedPayDests property of a MissionServiceContract
 * based on its paymentDistributions.
 * @param contract The MissionServiceContract to manipulate.
 * @returns The modified MissionServiceContract.
 */
export function populateGroupedPayDests(
  contract: MissionServiceContract
): MissionServiceContract {
  // Ensure groupedPayDests is initialized
  contract.groupedPayDest = createGroupedPayDest();
  contract.groupedPayDest.contract = createContractPayDist();

  // Temporary maps to group additions and deductions by adjustmentId
  const additionsMap = new Map<number, ContractAdditionPayDist>();
  const deductionsMap = new Map<number, ContractDeductionPayDist>();

  for (const distribution of contract.paymentDistributions) {
    const payDest: PayDest = {
      userName: distribution.userName,
      amount: distribution.amount,
    };

    if (distribution.adjustmentId === null || distribution.adjustmentId === undefined) {
      // Add to contract items if no adjustmentId
      contract.groupedPayDest.contract.items.push(payDest);
      contract.groupedPayDest.contract.price += distribution.amount; // Assuming price is total of non-adjusted payments
    } else {
      if (distribution.type === "Addition") {
        if (!additionsMap.has(distribution.adjustmentId)) {
          const newAdditionGroup = createContractAdditionPayDist({
            date: distribution.date, // Use the date of the first item in the group
            note: distribution.adjustmentNotes,
            amount: 0, // Will sum up amounts later
            items: [],
          });
          additionsMap.set(distribution.adjustmentId, newAdditionGroup);
          contract.groupedPayDest.additions.push(newAdditionGroup); // Add to the main additions array
        }
        const additionGroup = additionsMap.get(distribution.adjustmentId)!;
        additionGroup.items.push(payDest);
        additionGroup.amount += distribution.amount;
        contract.groupedPayDest.contract.additions += distribution.amount; // Summing up total additions
      } else if (distribution.type === "Deduction") {
        if (!deductionsMap.has(distribution.adjustmentId)) {
          const newDeductionGroup = createContractDeductionPayDist({
            date: distribution.date, // Use the date of the first item in the group
            note: distribution.adjustmentNotes,
            amount: 0, // Will sum up amounts later
            items: [],
          });
          deductionsMap.set(distribution.adjustmentId, newDeductionGroup);
          contract.groupedPayDest.deductions.push(newDeductionGroup); // Add to the main deductions array
        }
        const deductionGroup = deductionsMap.get(distribution.adjustmentId)!;
        deductionGroup.items.push(payDest);
        deductionGroup.amount += distribution.amount;
        contract.groupedPayDest.contract.deductions += distribution.amount; // Summing up total deductions
      }
    }
  }

  // Calculate total for the contract (price - deductions + additions)
  /*contract.groupedPayDests.contract.total =
    contract.groupedPayDests.contract.price +
    contract.groupedPayDests.contract.additions -
    contract.groupedPayDests.contract.deductions;*/

  return contract;
}