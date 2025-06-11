import apiLocal from "../../../app/api/axiosLocal";

interface TaskRequestDTO {
    title: string;
    dueDate: string;
    priority: string;
}

interface TaskResponseDTO {
    taskId: string;
    title: string;
    dueDate: string;
    priority: string;
}

interface CommonResponseDTO {
    success: boolean;
    message: string;
    util: string;
}

export const taskApi = {
    fetchAllTasks: () =>
        apiLocal.get<TaskResponseDTO[]>('/task/fetchAll'),

    addTask: (task: TaskRequestDTO) =>
        apiLocal.post<CommonResponseDTO>('/task/add', task),

    updateTask: (taskId: string, task: TaskRequestDTO) =>
        apiLocal.put<CommonResponseDTO>(`/task/update/${taskId}`, task),

    deleteTask: (taskId: string) =>
        apiLocal.delete<CommonResponseDTO>(`/task/delete/${taskId}`),
}