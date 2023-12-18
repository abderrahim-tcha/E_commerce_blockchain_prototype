def find_free_machine(machines):
    for i, machine in enumerate(machines):
        if machine is None:
            return i
    return None

def GARD_scheduling(n, processing_times):
    machines = [None, None]  # Two machines initially empty
    scheduling_order = []  # To store the order of task scheduling

    # Step 1
    pkh = max(processing_times[i][j] for i in range(n) for j in range(2))

    # Step 2
    scheduling_order.append(f"Tk sur M{3 - pkh}")
    machines[1] = "Tk"  # Correct the indexing here

    # Step 3
    for i in range(n):
        if i + 1 != pkh:
            free_machine = find_free_machine(machines)
            if free_machine is not None:
                scheduling_order.append(f"T{i + 1} sur M{free_machine + 1}")
                machines[free_machine] = f"T{i + 1}"

    # Step 4
    scheduling_order.append(f"Tk sur M{pkh}")

    # Step 5
    for i in range(n):
        if i + 1 != pkh:
            free_machine = find_free_machine(machines)
            if free_machine is not None:
                scheduling_order.append(f"Opération restante de T{i + 1} sur M{free_machine + 1}")
                machines[free_machine] = f"T{i + 1}"

    # Print the scheduling order
    print("Ordre d'ordonnancement:")
    for task in scheduling_order:
        print(task)

# Example usage
n = 3  # Number of tasks
processing_times = [
    [2, 4],
    [3, 5],
    [1, 7]
]

GARD_scheduling(n, processing_times)
