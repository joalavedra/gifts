import { Send, Boxes } from "lucide-react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { useWriteContracts, useShowCallsStatus } from 'wagmi/experimental'
import { useCallback } from 'react';
import { parseAbi } from 'viem';
import { abi } from "../../app/utils/abi";


export function useWalletActions() {
  // Transaction hooks
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Batched transaction hooks
  const { data: bundleIdentifier, isPending: callsPending, error: callsError, writeContracts } = useWriteContracts();
  const { showCallsStatus, isPending: bundlePending, error: bundleError } = useShowCallsStatus();

  // Transaction handlers
  const handleExampleTx = useCallback(() => {
    writeContract({
      abi,
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      functionName: 'mint',
      args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
    });
  }, [writeContract]);

  const handleSendCalls = useCallback(() => {
    writeContracts({
      contracts: [
        {
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          abi: parseAbi(['function mint(address) returns (bool)']),
          functionName: 'mint',
          args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
        },
        {
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          abi: parseAbi(['function mint(address) returns (bool)']),
          functionName: 'mint',
          args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
        },
      ],
    });
  }, [writeContracts]);


  const handleShowCallsStatus = useCallback((identifier?:string) => {
    if (identifier) {
      showCallsStatus({ id: identifier });
    }
  }, [showCallsStatus]);


  const actions = [
    {
      icon: Send,
      title: "eth_sendTransaction",
      buttonText: "Send Transaction",
      onClick: handleExampleTx,
      isLoading: isPending,
      error,
      hash,
      isConfirming,
      isConfirmed,
    },
    {
      icon: Boxes,
      title: "wallet_sendCalls",
      buttonText: "Send Batch",
      onClick: handleSendCalls,
      isLoading: callsPending,
      error: callsError,
      hash: bundleIdentifier as `0x${string}` | undefined,
    },
  ];

  return { actions };
}