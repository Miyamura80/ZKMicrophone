from buttons import BaseButton


class FileButton(BaseButton):
    """
    Button that depends on file.
    """

    def __init__(self, button_state_path):
        self.button_state_path = button_state_path


    def state(self):
        with open(self.button_state_path, "r") as f:
            state = f.read()

        return state 
