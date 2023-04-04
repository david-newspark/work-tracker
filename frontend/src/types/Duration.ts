interface Duration {
    type: DurationType,
    length: number
}

enum DurationType {
    SECONDS = "Seconds",
    MINUTES = "Minutes",
    HOURS = "Hours"
}

export {type Duration, DurationType}