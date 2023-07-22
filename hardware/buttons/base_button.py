from abc import ABC, abstractmethod


class BaseButton(ABC):
    """
    Base class for button.
    """

    @abstractmethod
    def state(self):
        """
        Return the current state of the button. 
        """
        pass
